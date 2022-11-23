import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  @Prop()
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  albums: ObjectId[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
