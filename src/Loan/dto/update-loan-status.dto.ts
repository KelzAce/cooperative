import { IsString, IsIn } from 'class-validator';

export class UpdateLoanStatusDto {
  @IsString()
  @IsIn(['pending', 'approved', 'rejected'])
  readonly status: string;
}
