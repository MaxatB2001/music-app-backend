import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot('mongodb+srv://maxat:maksat123@cluster0.dk4xp5g.mongodb.net/?retryWrites=true&w=majority'),
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
  ]
})
export class AppModule {}
