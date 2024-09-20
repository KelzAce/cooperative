import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Loan, LoanDocument } from './schemas/loan.schema';
import { Cooperative } from '../Cooperative/schemas/cooperative.schema';

@Injectable()
export class LoanService {
  constructor(
    @InjectModel(Loan.name) private loanModel: Model<LoanDocument>,
    @InjectModel(Cooperative.name) private cooperativeModel: Model<Cooperative>,
  ) {}

  async applyForLoan(
    applicantId: string,
    cooperativeId: string,
    guarantorId: string,
    amount: number,
    purpose: string,
  ): Promise<Loan> {
    // Check if both applicant and guarantor are part of the same cooperative
    const applicant = await this.cooperativeModel.findById(applicantId);
    const guarantor = await this.cooperativeModel.findById(guarantorId);

    if (!applicant || !guarantor) {
      throw new BadRequestException('Invalid applicant or guarantor');
    }

    if (applicant.cooperativeId.toString() !== guarantor.cooperativeId.toString()) {
      throw new BadRequestException('Applicant and guarantor must belong to the same cooperative');
    }

    // Create new loan application
    const loan = new this.loanModel({
      loanType: purpose,
      cooperative: cooperativeId,
      applicant: applicantId,
      guarantor: guarantorId,
      amount,
      purpose,
      status: 'pending',
    });

    return loan.save();
  }

  async getLoanStatus(loanId: string): Promise<Loan> {
    const loan = await this.loanModel.findById(loanId).populate('applicant guarantor');
    if (!loan) {
      throw new BadRequestException('Loan not found');
    }
    return loan;
  }
}
