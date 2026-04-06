import { Module } from '@nestjs/common';
import { ActivationsRepository } from './infra/activations.repository';
import { PromocodesRepository } from './infra/promocodes.repository';
import { PromocodesController } from './promocodes.controller';
import { PromocodesService } from './promocodes.service';
import { ACTIVATIONS_REPOSITORY } from './ports/activations.repository.port';
import { PROMOCODES_REPOSITORY } from './ports/promocodes.repository.port';

@Module({
  controllers: [PromocodesController],
  providers: [
    PromocodesService,
    { provide: PROMOCODES_REPOSITORY, useClass: PromocodesRepository },
    { provide: ACTIVATIONS_REPOSITORY, useClass: ActivationsRepository },
  ],
})
export class PromocodesModule {}
