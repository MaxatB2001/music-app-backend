import {Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Artist, ArtistDocument } from "src/artist/schemas/Artist.schema";
import { FileService, FileType } from "src/file/file.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Track, TrackDocument } from "./schemas/Track.schema";

@Injectable()
export class TrackService {

  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
              @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
              private fileService: FileService) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const pictureFile = this.fileService.saveFile(FileType.IMAGE, picture);
    const audioFile = this.fileService.saveFile(FileType.AUDIO, audio);
    const track = await this.trackModel.create({...dto, picture: pictureFile, audio: audioFile, listens: 0});
    const artist = await this.artistModel.findById(dto.artist);
    artist.tracks.push(track._id);
    await artist.save();
    return track;
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Array<Track>> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async chart() {
    return await this.trackModel.find().limit(100).sort({listens: -1}).populate('artist')
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('artist');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addListen(id: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);
    track.listens++;
    track.save();
  }

  async search(query: string): Promise<Array<Track>> {
    let tracks: Array<Track> = [];
    if (query) {
        tracks = await this.trackModel.find({
        name: {$regex: new RegExp(query, 'i')},
      }).populate('artist');
    }
    return tracks;
  }
}