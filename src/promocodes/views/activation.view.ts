import { Expose } from 'class-transformer';

export class ActivationView {
  @Expose()
  id: string;

  @Expose()
  promocodeId: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  constructor(id: string, promocodeId: string, email: string, createdAt: Date) {
    this.id = id;
    this.promocodeId = promocodeId;
    this.email = email;
    this.createdAt = createdAt;
  }
}
