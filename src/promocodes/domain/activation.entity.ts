export interface ActivationInput {
  id: string;
  promocodeId: string;
  email: string;
  createdAt: Date;
}

export class Activation {
  private readonly _id: string;
  private readonly _promocodeId: string;
  private readonly _email: string;
  private readonly _createdAt: Date;

  constructor(data: ActivationInput) {
    this._id = data.id;
    this._promocodeId = data.promocodeId;
    this._email = data.email;
    this._createdAt = data.createdAt;
  }

  get id(): string {
    return this._id;
  }

  get promocodeId(): string {
    return this._promocodeId;
  }

  get email(): string {
    return this._email;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
