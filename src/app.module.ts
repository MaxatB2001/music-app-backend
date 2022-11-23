import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { SelectionsModule } from './selections/selections.module';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot('mongodb+srv://maxat:maksat123@cluster0.dk4xp5g.mongodb.net/?retryWrites=true&w=majority'),
    FileModule,
    AlbumModule,
    ArtistModule,
    UsersModule,
    RolesModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AuthModule,
    SelectionsModule,
  ],
})
export class AppModule {}
