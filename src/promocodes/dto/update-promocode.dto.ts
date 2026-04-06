import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdatePromocodeDto {
  @IsOptional()
  @IsString()
  @Length(1, 64)
  code?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  discountPercent?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  activationLimit?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiresAt?: Date;
}
