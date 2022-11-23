import { FileService } from './../file/file.service';
import { Artist, ArtistSchema } from './schemas/Artist.schema';
import { ArtistService } from './artist.service';
import { Module } from "@nestjs/common";
import { ArtistController } from "./artist.controller";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}])
  ],
  controllers: [ArtistController],
  providers: [ArtistService, FileService]
})
export class ArtistModule {}