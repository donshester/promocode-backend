import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../common/errors';
import { PromocodesErrorCode } from './promocodes-error-code.enum';

export class PromocodeCodeTakenError extends AppError {
  readonly errorCode = PromocodesErrorCode.PROMOCODE_CODE_TAKEN;

  constructor(code: string) {
    super(`Promocode code "${code}" is already taken`, HttpStatus.CONFLICT, {
      code,
    });
  }
}
