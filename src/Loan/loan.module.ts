import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { Loan, LoanSchema } from './schemas/loan.schema';
import { Cooperative, CooperativeSchema } from '../cooperative/schemas/cooperative.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    MongooseModule.forFeature([{ name: Cooperative.name, schema: CooperativeSchema }]),
  ],
  providers: [LoanService],
  controllers: [LoanController],
})
export class LoanModule {}
