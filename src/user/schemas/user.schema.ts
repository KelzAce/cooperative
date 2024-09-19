import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Name } from './name.schema';
import { Otp } from './otp.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Name, required: true, default: () => ({}) })
  name: Name;

  @Prop()
  image: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({ type: Boolean, required: true, default: false })
  emailVerified: boolean = false;

  @Prop({ type: Otp, required: true, default: () => ({}) })
  otp: Otp;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    validate: {
      validator: (value: string) => /^\d{11}$/.test(value),
      message: (props) =>
        `${props.value} is not a valid BVN! It must be exactly 11 digits long.`,
    },
  })
  bvn: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
