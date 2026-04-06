import { Injectable } from '@nestjs/common';
import { Prisma, type Activation as PrismaActivation } from '@prisma/client';
import { PrismaTransactionContextService } from '../../prisma/prisma-transaction-context.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Activation } from '../domain/activation.entity';
import type {
  CreateActivationParams,
  IActivationsRepository,
} from '../ports/activations.repository.port';
import { isUniqueConstraintViolation } from './prisma-errors';

@Injectable()
export class ActivationsRepository implements IActivationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get client(): PrismaService | Prisma.TransactionClient {
    return PrismaTransactionContextService.getClient() ?? this.prisma;
  }

  async create(params: CreateActivationParams): Promise<Activation | null> {
    try {
      const row = await this.client.activation.create({
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

  private convertFromModel(row: PrismaActivation): Activation {
    return new Activation({
      id: row.id,
      promocodeId: row.promocodeId,
      email: row.email,
      createdAt: row.createdAt,
    });
  }

  private convertToModel(
    params: CreateActivationParams,
  ): Prisma.ActivationUncheckedCreateInput {
    return {
      promocodeId: params.promocodeId,
      email: params.email,
    };
  }
}
