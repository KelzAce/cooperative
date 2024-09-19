import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform((params) => {
    const value: string = params.value.trim();
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @Transform((params) => {
    const value: string = params.value.trim();
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

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
