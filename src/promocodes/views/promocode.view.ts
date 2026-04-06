import { Expose } from 'class-transformer';

export class PromocodeView {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  discountPercent: number;

  @Expose()
  activationLimit: number;

  @Expose()
  expiresAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(
    id: string,
    code: string,
    discountPercent: number,
    activationLimit: number,
    expiresAt: Date,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.code = code;
    this.discountPercent = discountPercent;
    this.activationLimit = activationLimit;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
