import { CreateArtistDto } from './dto/create-artist-dto';
import { ArtistService } from './artist.service';
import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

@Controller('/artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/search')
  async search(@Query('query') query: string) {
    return this.artistService.search(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId) {
    return this.artistService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() picture: Express.Multer.File,
    @Body() dto: CreateArtistDto,
  ) {
    return this.artistService.create(dto, picture);
  }
}