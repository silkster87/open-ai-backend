/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema()
export class Summary {
  @Prop({ required: true })
  text: string;

  @Prop()
  created: number;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
