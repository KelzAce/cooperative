import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Cooperative } from '../../cooperative/schemas/cooperative.schema';

export type LoanDocument = Loan & Document;

@Schema({ timestamps: true })
export class Loan {
  @Prop({ required: true })
  loanType: string;

  @Prop({ type: Types.ObjectId, ref: 'Cooperative', required: true })
  cooperative: Cooperative;

  @Prop({ type: Types.ObjectId, ref: 'Cooperative', required: true })
  applicant: Cooperative;  // Member applying for the loan

  @Prop({ type: Types.ObjectId, ref: 'Cooperative', required: true })
  guarantor: Cooperative;  // Member acting as guarantor

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'pending' })  // Loan status (e.g., pending, approved, rejected)
  status: string;

  @Prop({ required: true })
  purpose: string;  // Purpose of the loan (Contribution, Health, Easter, School fees)
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
