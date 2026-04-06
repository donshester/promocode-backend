import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../common/errors';
import { PromocodesErrorCode } from './promocodes-error-code.enum';

export class PromocodeNotFoundError extends AppError {
  readonly errorCode = PromocodesErrorCode.PROMOCODE_NOT_FOUND;

  constructor(id: string) {
    super(`Promocode ${id} not found`, HttpStatus.NOT_FOUND, {
      promocodeId: id,
    });
  }
}
