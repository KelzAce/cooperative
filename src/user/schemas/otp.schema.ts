import { Prop } from '@nestjs/mongoose';

export class Otp {
    @Prop()
    data?: string;

    @Prop({ type: Date })
    expires?: Date;
}