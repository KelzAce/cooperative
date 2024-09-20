import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cooperative extends Document {
  @Prop({ default: () => Math.floor(Math.random() * 1000000).toString() })  // Example auto-generated ID
  cooperativeId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const CooperativeSchema = SchemaFactory.createForClass(Cooperative);
