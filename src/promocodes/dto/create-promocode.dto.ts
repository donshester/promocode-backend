import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePromocodeDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  code!: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  discountPercent!: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  activationLimit!: number;

  @IsDate()
  @Type(() => Date)
  expiresAt!: Date;
}
