import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user-dto';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/User.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user;
  }

  async getAll() {
    const users = await this.userModel.find().populate('likedTracks').populate('likedAlbums');
    return users;
  }

  async getOne(id: string) {
    const user = await this.userModel.findById(id);
    return user
  }

  async getLikedSongs(id: string) {
    const songs = await this.userModel.findOne({_id: id}).select('likedTracks -_id').populate({path: 'likedTracks', populate: {path: 'artist'}});
    return songs;
  }

  async getLikedAlbums(id: string) {
    const albums = await this.userModel.findOne({_id: id}).select('likedAlbums -_id').populate({path: 'likedAlbums', populate: {path: 'artist'}});
    return albums;
  }

  async getLikedArtist(id: string) {
    const artist = await this.userModel.findOne({_id: id}).select('likedArtists -_id').populate('likedArtists');
    return artist;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async addLikedSong(userId: ObjectId, songId: ObjectId) {
    const user = await this.userModel.findById(userId);
    user.likedTracks.push(songId);
    user.save();
  }

  async addLikedAlbum(userId: ObjectId, albumId: ObjectId) {
    const user = await this.userModel.findById(userId);
    user.likedAlbums.push(albumId);
    user.save();
  }

  async addLikedArtist(userId: ObjectId, artistId: ObjectId) {
    const user = await this.userModel.findById(userId);
    user.likedArtists.push(artistId);
    user.save();
  }

  async removeLikedSong(userId: ObjectId, songId: ObjectId) {
    await this.userModel.updateOne({_id: userId}, {$pullAll: {likedTracks: [{_id: songId}]}})
  }

  async removeLikedAlbum(userId: ObjectId, albumId: ObjectId) {
    await this.userModel.updateOne({_id: userId}, {$pullAll: {likedAlbums: [{_id: albumId}]}})
  }
}
