import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../common/errors';
import { PromocodesErrorCode } from './promocodes-error-code.enum';

export class PromocodeExpiredError extends AppError {
  readonly errorCode = PromocodesErrorCode.PROMOCODE_EXPIRED;

  constructor(promocodeId: string) {
    super('Promocode has expired', HttpStatus.CONFLICT, {
      promocodeId,
    });
  }
}
