import { Artist, ArtistDocument } from './schemas/Artist.schema';
import { Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FileService, FileType } from "src/file/file.service";
import { CreateArtistDto } from "./dto/create-artist-dto";
import { Model, Schema } from 'mongoose';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    private fileService: FileService,
  ) {}
  
  getOne(id: Schema.Types.ObjectId) {
    return this.artistModel.findById(id).populate('tracks').populate({path: 'albums', populate: {path: 'artist'}});
  }

  async create(dto: CreateArtistDto, picture) {
    const pictureFile = this.fileService.saveFile(FileType.IMAGE, picture);
    const artist = await this.artistModel.create({...dto, picture: pictureFile})
    return artist;
  }

  async search(query: string): Promise<Array<Artist>> {
    let artists: Array<Artist> = [];
    if (query) {
        artists = await this.artistModel.find({
        name: {$regex: new RegExp(query, 'i')},
      });
    }
    return artists;
  }
}