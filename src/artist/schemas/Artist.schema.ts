import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from "mongoose";

export type ArtistDocument = Artist & Document

@Schema()
export class Artist {
  @Prop()
  name: string

  @Prop()
  picture: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  albums: ObjectId[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist)