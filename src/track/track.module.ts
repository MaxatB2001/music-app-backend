import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Artist, ArtistSchema } from "src/artist/schemas/Artist.schema";
import { FileService } from "src/file/file.service";
import { Track, TrackSchema } from "./schemas/Track.schema";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FileService]
})
export class TrackModule {} 