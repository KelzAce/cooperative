import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { LoanService } from './loan.service';
import { Loan } from './schemas/loan.schema';
import { CreateLoanDto } from './dto/create-loan';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  /**
   * Endpoint to apply for a loan.
   * @param createLoanDto - Data required for loan application
   * @returns Created loan document
   */
  @Post('apply')
  async applyForLoan(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    const { applicantId, cooperativeId, guarantorId, amount, purpose } = createLoanDto;
    return this.loanService.applyForLoan(applicantId, cooperativeId, guarantorId, amount, purpose);
  }

  /**
   * Endpoint to get loan status.
   * @param id - The ID of the loan
   * @returns Loan details including status
   */
  @Get(':id/status')
  async getLoanStatus(@Param('id') loanId: string): Promise<Loan> {
    return this.loanService.getLoanStatus(loanId);
  }
}
