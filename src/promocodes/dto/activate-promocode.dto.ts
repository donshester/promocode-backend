import { IsEmail, IsNotEmpty } from 'class-validator';

export class ActivatePromocodeDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
