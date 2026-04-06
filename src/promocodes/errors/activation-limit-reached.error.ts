import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../common/errors';
import { PromocodesErrorCode } from './promocodes-error-code.enum';

export class ActivationLimitReachedError extends AppError {
  readonly errorCode = PromocodesErrorCode.ACTIVATION_LIMIT_REACHED;

  constructor(promocodeId: string) {
    super('Activation limit reached', HttpStatus.CONFLICT, {
      promocodeId,
    });
  }
}
