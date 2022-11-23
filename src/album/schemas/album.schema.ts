import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Artist } from 'src/artist/schemas/Artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  name: string;

  // @Prop()
  // artist: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist: Artist;

  @Prop()
  picture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: ObjectId[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
