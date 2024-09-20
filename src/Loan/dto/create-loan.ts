import { IsString, IsNumber, IsMongoId, IsIn } from 'class-validator';

export class CreateLoanDto {
  @IsMongoId()
  readonly applicantId: string;

  @IsMongoId()
  readonly cooperativeId: string;

  @IsMongoId()
  readonly guarantorId: string;

  @IsNumber()
  readonly amount: number;

  @IsString()
  @IsIn(['Contribution', 'Health', 'Easter', 'School fees'])
  readonly purpose: string;
}
