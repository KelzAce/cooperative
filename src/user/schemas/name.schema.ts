import { Prop } from '@nestjs/mongoose';

export class Name {
  @Prop({ type: String, trim: true })
  firstname: string;

  @Prop({ type: String, trim: true })
  lastname: string;
}