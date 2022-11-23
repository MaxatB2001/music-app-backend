import { CreateSectionDto } from './dto/create-section-dto';
import { Section, SectionDocument } from './schemas/section.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SelectionsService {
  constructor(@InjectModel(Section.name) private sectionModel: Model<SectionDocument>) {}

  async create(dto: CreateSectionDto) {
    const albums = JSON.parse(dto.albumIds);
    const section = await this.sectionModel.create({...dto, albums: albums});
    return section;
  }

  async get() {
    return await this.sectionModel.find().populate({path: 'albums', populate: {path: 'artist'}});
  }
}
