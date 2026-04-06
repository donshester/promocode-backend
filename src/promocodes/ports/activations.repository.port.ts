import type { Activation } from '../domain/activation.entity';

export type CreateActivationParams = {
  promocodeId: string;
  email: string;
};

export interface IActivationsRepository {
  create(params: CreateActivationParams): Promise<Activation | null>;
}

export const ACTIVATIONS_REPOSITORY = Symbol('ACTIVATIONS_REPOSITORY');
