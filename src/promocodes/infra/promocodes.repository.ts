import { Injectable } from '@nestjs/common';
import { Prisma, type Promocode as PrismaPromocode } from '@prisma/client';
import { PrismaTransactionContextService } from '../../prisma/prisma-transaction-context.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Promocode } from '../domain/promocode.entity';
import type {
  CreatePromocodeParams,
  IPromocodesRepository,
  PromocodeWithActivationCount,
  UpdatePromocodeParams,
} from '../ports/promocodes.repository.port';
import { isUniqueConstraintViolation } from './prisma-errors';

type PrismaPromocodeWithCount = Prisma.PromocodeGetPayload<{
  include: { _count: { select: { activations: true } } };
}>;

@Injectable()
export class PromocodesRepository implements IPromocodesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get client(): PrismaService | Prisma.TransactionClient {
    return PrismaTransactionContextService.getClient() ?? this.prisma;
  }

  async create(params: CreatePromocodeParams): Promise<Promocode | null> {
    try {
      const row = await this.client.promocode.create({
        data: this.convertToModel(params),
      });

      return this.convertFromModel(row);
    } catch (e) {
      if (isUniqueConstraintViolation(e)) {
        return null;
      }
      throw e;
    }
  }

  async findAll(): Promise<Promocode[]> {
    const rows = await this.client.promocode.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => this.convertFromModel(row));
  }

  async findById(id: string): Promise<Promocode | null> {
    const row = await this.client.promocode.findUnique({ where: { id } });
    return row ? this.convertFromModel(row) : null;
  }

  async update(
    id: string,
    params: UpdatePromocodeParams,
  ): Promise<Promocode | null> {
    try {
      const row = await this.client.promocode.update({
        where: { id },
        data: params,
      });

      return this.convertFromModel(row);
    } catch (e) {
      if (isUniqueConstraintViolation(e)) {
        return null;
      }

      throw e;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.client.promocode.deleteMany({ where: { id } });

    return result.count > 0;
  }

  async findByIdLockedWithActivationCount(
    promocodeId: string,
  ): Promise<PromocodeWithActivationCount | null> {
    await this.client.$executeRaw(
      Prisma.sql`SELECT id FROM promocodes WHERE id = ${promocodeId} FOR UPDATE`,
    );

    const row = await this.client.promocode.findUnique({
      where: { id: promocodeId },
      include: { _count: { select: { activations: true } } },
    });

    if (!row) {
      return null;
    }

    return this.convertFromModelWithActivationCount(row);
  }

  private convertFromModel(row: PrismaPromocode): Promocode {
    return new Promocode({
      id: row.id,
      code: row.code,
      discountPercent: row.discountPercent,
      activationLimit: row.activationLimit,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  private convertFromModelWithActivationCount(
    row: PrismaPromocodeWithCount,
  ): PromocodeWithActivationCount {
    const { _count, ...promo } = row;

    return {
      promocode: this.convertFromModel(promo),
      activationCount: _count.activations,
    };
  }

  private convertToModel(
    params: CreatePromocodeParams,
  ): Prisma.PromocodeCreateInput {
    return {
      code: params.code,
      discountPercent: params.discountPercent,
      activationLimit: params.activationLimit,
      expiresAt: params.expiresAt,
    };
  }
}
