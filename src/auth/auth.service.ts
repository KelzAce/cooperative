// src/auth/auth.service.ts
import { Body, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Methods for AuthService go here
  async register(createUserDto: CreateUserDto) {
    const { first_name, last_name, email, password } = createUserDto;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Create and save the user
      const user = new User();
      user.first_name = first_name; 
      user.last_name = last_name;
      user.email = email;
      user.password = hashedPassword;
      user.otp = otp;

      await this.userService.saveUser(user);

      // Send OTP email
      await this.sendOTPEmail(email, otp);

      return { message: 'OTP sent to your email' };
    } catch (error) {
      // Handle specific errors with more detail
      if (error.message.includes('user already exists')) {
        throw new Error('A user with this email already exists. Please use a different email address.');
      } else if (error.message.includes('Failed to send OTP email')) {
        throw new Error('Failed to send OTP email. Please try again later.');
      } else {
        throw new Error(`Registration failed: ${error.message}`);
      }
    }
  }

  async sendOTPEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Email Verification OTP',
      text: `Your OTP is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async verifyEmail(email: string, otp: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.otp === otp) {
      user.isEmailVerified = true;
      return this.userService.saveUser(user);
    }
    throw new Error('Invalid OTP');
  }

  async login(loginUserDto: LoginDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
