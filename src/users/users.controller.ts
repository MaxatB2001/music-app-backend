import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

@Controller('/users')
export class UsersController {
  constructor(private readonly userServise: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userServise.createUser(dto);
  }

  @Get()
  async getAll() {
    return this.userServise.getAll();
  }

  @Get('/one')
  @UseGuards(JwtAuthGuard)
  async getOne(@Req() req) {
    return this.userServise.getOne(req.user.id);
  }

  @Get('/likedSongs')
  @UseGuards(JwtAuthGuard)
  async getLikedSongs(@Req() req) {
    return this.userServise.getLikedSongs(req.user.id);
  }

  @Get('/likedAlbums')
  @UseGuards(JwtAuthGuard)
  async getLikedAlbums(@Req() req) {
    return this.userServise.getLikedAlbums(req.user.id);
  }

  @Get('/likedArtist')
  @UseGuards(JwtAuthGuard)
  async getLikedArtist(@Req() req) {
    return this.userServise.getLikedArtist(req.user.id);
  }

  @Post('/addLikedSong')
  @UseGuards(JwtAuthGuard)
  async addLikedSong(@Body() dto: {songId: ObjectId}, @Req() req) {
    this.userServise.addLikedSong(req.user.id, dto.songId); 
  }

  @Post('/addLikedAlbum')
  @UseGuards(JwtAuthGuard)
  async addLikedAlbum(@Body() {albumId}: {albumId: ObjectId}, @Req() req) {
    this.userServise.addLikedAlbum(req.user.id, albumId); 
  }

  @Post('/addLikedArtist')
  @UseGuards(JwtAuthGuard)
  async addLikedArtist(@Body() {artistId}: {artistId: ObjectId}, @Req() req) {
    this.userServise.addLikedArtist(req.user.id, artistId); 
  }

  @Post('/removeLikedSong')
  @UseGuards(JwtAuthGuard)
  async removeLikedSong(@Body() dto: {songId: ObjectId}, @Req() req) {
    this.userServise.removeLikedSong(req.user.id, dto.songId); 
  }

  @Post('/removeLikedAlbum')
  @UseGuards(JwtAuthGuard)
  async removeLikedAlbum(@Body() dto: {albumId: ObjectId}, @Req() req) {
    this.userServise.removeLikedAlbum(req.user.id, dto.albumId); 
  }
}
