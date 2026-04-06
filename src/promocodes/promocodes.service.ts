import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaTransactional } from '../prisma/prisma-transactional.decorator';
import type { Activation } from './domain/activation.entity';
import type { Promocode } from './domain/promocode.entity';
import { ActivatePromocodeDto } from './dto/activate-promocode.dto';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import {
  ActivationDuplicateError,
  ActivationLimitReachedError,
  PromocodeCodeTakenError,
  PromocodeExpiredError,
  PromocodeNotFoundError,
} from './errors';
import { isRecordNotFound } from './infra/prisma-errors';
import {
  ACTIVATIONS_REPOSITORY,
  type IActivationsRepository,
} from './ports/activations.repository.port';
import {
  PROMOCODES_REPOSITORY,
  type IPromocodesRepository,
  type UpdatePromocodeParams,
} from './ports/promocodes.repository.port';

@Injectable()
export class PromocodesService {
  constructor(
    @Inject(PROMOCODES_REPOSITORY)
    private readonly promocodesRepository: IPromocodesRepository,
    @Inject(ACTIVATIONS_REPOSITORY)
    private readonly activationsRepository: IActivationsRepository,
  ) {}

  async create(dto: CreatePromocodeDto): Promise<Promocode> {
    const code = this.normalizeCode(dto.code);

    const row = await this.promocodesRepository.create({
      code,
      discountPercent: dto.discountPercent,
      activationLimit: dto.activationLimit,
      expiresAt: dto.expiresAt,
    });

    if (!row) {
      throw new PromocodeCodeTakenError(code);
    }

    return row;
  }

  findAll(): Promise<Promocode[]> {
    return this.promocodesRepository.findAll();
  }

  async findOne(id: string): Promise<Promocode> {
    const row = await this.promocodesRepository.findById(id);
    if (!row) {
      throw new PromocodeNotFoundError(id);
    }

    return row;
  }

  async update(id: string, dto: UpdatePromocodeDto): Promise<Promocode> {
    const params: UpdatePromocodeParams = {
      code: dto.code ? this.normalizeCode(dto.code) : undefined,
      discountPercent: dto.discountPercent,
      activationLimit: dto.activationLimit,
      expiresAt: dto.expiresAt,
    };

    if (Object.values(params).every((v) => v === undefined)) {
      throw new BadRequestException('At least one field is required');
    }

    const existing = await this.promocodesRepository.findById(id);
    if (!existing) {
      throw new PromocodeNotFoundError(id);
    }

    try {
      const updated = await this.promocodesRepository.update(id, params);
      if (updated === null) {
        throw new PromocodeCodeTakenError(
          typeof params.code === 'string' ? params.code : existing.code,
        );
      }

      return updated;
    } catch (e: unknown) {
      if (isRecordNotFound(e)) {
        throw new PromocodeNotFoundError(id);
      }

      throw e;
    }
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.promocodesRepository.deleteById(id);

    if (!deleted) {
      throw new PromocodeNotFoundError(id);
    }
  }

  @PrismaTransactional()
  async activate(
    promocodeId: string,
    dto: ActivatePromocodeDto,
  ): Promise<Activation> {
    const email = this.normalizeEmail(dto.email);

    const row =
      await this.promocodesRepository.findByIdLockedWithActivationCount(
        promocodeId,
      );

    if (!row) {
      throw new PromocodeNotFoundError(promocodeId);
    }

    if (row.promocode.expiresAt.getTime() < Date.now()) {
      throw new PromocodeExpiredError(promocodeId);
    }

    if (row.activationCount >= row.promocode.activationLimit) {
      throw new ActivationLimitReachedError(promocodeId);
    }

    const activation = await this.activationsRepository.create({
      promocodeId,
      email,
    });

    if (!activation) {
      throw new ActivationDuplicateError(promocodeId, email);
    }

    return activation;
  }

  private normalizeCode(code: string): string {
    return code.trim().toUpperCase();
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
