import { CreateSectionDto } from './dto/create-section-dto';
import { SelectionsService } from './selections.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/selections')
export class SelectionsController {
  constructor(private readonly selectionServise: SelectionsService) {}

  @Post()
  create(@Body() dto: CreateSectionDto) {
    return this.selectionServise.create(dto);
  }

  @Get()
  get() {
    return this.selectionServise.get();
  }
}
