export interface PromocodeInput {
  id: string;
  code: string;
  discountPercent: number;
  activationLimit: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Promocode {
  private readonly _id: string;
  private readonly _code: string;
  private readonly _discountPercent: number;
  private readonly _activationLimit: number;
  private readonly _expiresAt: Date;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(data: PromocodeInput) {
    this._id = data.id;
    this._code = data.code;
    this._discountPercent = data.discountPercent;
    this._activationLimit = data.activationLimit;
    this._expiresAt = data.expiresAt;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get code(): string {
    return this._code;
  }

  get discountPercent(): number {
    return this._discountPercent;
  }

  get activationLimit(): number {
    return this._activationLimit;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
