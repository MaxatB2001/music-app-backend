import { ObjectId } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album-dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from 'src/artist/schemas/Artist.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const pictureFile = this.fileService.saveFile(FileType.IMAGE, picture);
    const album = await this.albumModel.create({name: dto.name, artist: dto.artist, picture: pictureFile})
    const traksIds = JSON.parse(dto.tracksIds);
    traksIds.map(id => {
      album.tracks.push(id)
    })
    const artist = await this.artistModel.findById(dto.artist);
    artist.albums.push(album._id);
    await artist.save();
    await album.save();
    return album;
  }

  async getAll() {
    const albums = await this.albumModel.find();
    return albums;
  }

  async getOne(id: ObjectId) {
    const album = await this.albumModel.findById(id).populate({path: 'tracks', populate: {path: 'artist'}}).populate('artist');
    return album;
  }

  async search(query: string): Promise<Array<Album>> {
    let albums = []
    if (query) {
        albums = await this.albumModel.find({
        name: {$regex: new RegExp(query, 'i')}
      }).populate('artist');
    }
    return albums;
  }

  async getLatest() {
    return await this.albumModel.find().limit(30).sort({ _id: -1 }).populate('artist');
  }
}
