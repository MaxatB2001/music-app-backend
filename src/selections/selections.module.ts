import { Section, SectionSchema } from './schemas/section.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SelectionsController } from './selections.controller';
import { SelectionsService } from './selections.service';

@Module({
  controllers: [SelectionsController],
  providers: [SelectionsService],
  imports: [
    MongooseModule.forFeature([{name: Section.name, schema: SectionSchema}]),
  ],
})
export class SelectionsModule {}
