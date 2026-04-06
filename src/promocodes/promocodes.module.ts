import { Module } from '@nestjs/common';
import { PromocodesService } from './app';
import { ACTIVATIONS_REPOSITORY, PROMOCODES_REPOSITORY } from './domain';

import { ActivationsRepository, PromocodesRepository } from './infra';
import { PromocodesController } from './promocodes.controller';

@Module({
  controllers: [PromocodesController],
  providers: [
    PromocodesService,
    { provide: PROMOCODES_REPOSITORY, useClass: PromocodesRepository },
    { provide: ACTIVATIONS_REPOSITORY, useClass: ActivationsRepository },
  ],
})
export class PromocodesModule {}
