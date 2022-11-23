import { ArtistSchema } from './../artist/schemas/Artist.schema';
import { Album, AlbumSchema } from './schemas/album.schema';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Module } from "@nestjs/common";
import { FileService } from 'src/file/file.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist } from 'src/artist/schemas/Artist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService]
})
export class AlbumModule {}