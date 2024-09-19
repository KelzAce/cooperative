import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Get('/otp')
  async sendOtp(@Query() query: SendOtpDto) {
    return await this.authService.sendOtp(query);
  }

  @Patch('/verify-email')
  async verifyEmail(@Body() body: VerifyOtpDto) {
    return await this.authService.verifyEmail(body);
  }
}
