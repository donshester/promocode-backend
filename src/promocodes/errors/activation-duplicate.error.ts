import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../common/errors';
import { PromocodesErrorCode } from './promocodes-error-code.enum';

export class ActivationDuplicateError extends AppError {
  readonly errorCode = PromocodesErrorCode.ACTIVATION_DUPLICATE;

  constructor(promocodeId: string, email: string) {
    super(
      'This email has already activated this promocode',
      HttpStatus.CONFLICT,
      { promocodeId, email },
    );
  }
}
