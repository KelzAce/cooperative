import { Prop } from '@nestjs/mongoose';
import { isNumberString } from 'class-validator';

export class BankAccount {
  @Prop({ type: String })
  bankName: string;

  @Prop({ type: String })
  accountName: string;

  @Prop({
    type: String,
    validate: { validator: (v: string) => (v ? isNumberString(v) : true) },
  })
  accountNumber: string;
}