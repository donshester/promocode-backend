import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ActivatePromocodeDto,
  CreatePromocodeDto,
  UpdatePromocodeDto,
} from './dto';
import { PromocodesService } from './promocodes.service';
import { ActivationView, PromocodeView } from './views';

@Controller('promocodes')
export class PromocodesController {
  constructor(private readonly promocodesService: PromocodesService) {}

  @Post()
  async create(@Body() dto: CreatePromocodeDto): Promise<PromocodeView> {
    const p = await this.promocodesService.create(dto);

    return new PromocodeView(
      p.id,
      p.code,
      p.discountPercent,
      p.activationLimit,
      p.expiresAt,
      p.createdAt,
      p.updatedAt,
    );
  }

  @Get()
  async findAll(): Promise<PromocodeView[]> {
    const list = await this.promocodesService.findAll();

    return list.map(
      (p) =>
        new PromocodeView(
          p.id,
          p.code,
          p.discountPercent,
          p.activationLimit,
          p.expiresAt,
          p.createdAt,
          p.updatedAt,
        ),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PromocodeView> {
    const promocode = await this.promocodesService.findOne(id);

    return new PromocodeView(
      promocode.id,
      promocode.code,
      promocode.discountPercent,
      promocode.activationLimit,
      promocode.expiresAt,
      promocode.createdAt,
      promocode.updatedAt,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePromocodeDto,
  ): Promise<PromocodeView> {
    const promocode = await this.promocodesService.update(id, dto);

    return new PromocodeView(
      promocode.id,
      promocode.code,
      promocode.discountPercent,
      promocode.activationLimit,
      promocode.expiresAt,
      promocode.createdAt,
      promocode.updatedAt,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.promocodesService.remove(id);
  }

  @Post(':id/activate')
  async activate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActivatePromocodeDto,
  ): Promise<ActivationView> {
    const activation = await this.promocodesService.activate(id, dto);

    return new ActivationView(
      activation.id,
      activation.promocodeId,
      activation.email,
      activation.createdAt,
    );
  }
}
