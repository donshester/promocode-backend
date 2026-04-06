import type { Promocode } from '../entities';

export type PromocodeWithActivationCount = {
  readonly promocode: Promocode;
  readonly activationCount: number;
};

export type CreatePromocodeParams = {
  code: string;
  discountPercent: number;
  activationLimit: number;
  expiresAt: Date;
};

export type UpdatePromocodeParams = {
  code?: string;
  discountPercent?: number;
  activationLimit?: number;
  expiresAt?: Date;
};

export interface IPromocodesRepository {
  create(params: CreatePromocodeParams): Promise<Promocode | null>;
  findAll(): Promise<Promocode[]>;
  findById(id: string): Promise<Promocode | null>;
  update(id: string, params: UpdatePromocodeParams): Promise<Promocode | null>;
  deleteById(id: string): Promise<boolean>;

  findByIdLockedWithActivationCount(
    promocodeId: string,
  ): Promise<PromocodeWithActivationCount | null>;
}

export const PROMOCODES_REPOSITORY = Symbol('PROMOCODES_REPOSITORY');
