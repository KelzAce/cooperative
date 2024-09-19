import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @Transform(
    (params: { value: string }) => {
      const value: string = params.value;
      return value.trim().toLowerCase();
    },
    { toClassOnly: true },
  )
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;
}
