import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';
import { EmailTemplate } from 'src/email/email-templates';
import { SendOtpDto } from './dto/send-otp.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { CooperativeService } from 'src/cooperative/cooperative.service';
import { JoinCooperativeDto } from 'src/cooperative/dto/join-cooperative.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly cooperativeService: CooperativeService
  ) {}

  async signup(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);

    const otp = await this.sendOtp({ email: user.email });



    // const joinCooperative = this.cooperativeService.generateJoinLink(joinCooperativedto)

    const token = this.jwtService.sign({ sub: user.id });

    return { message: 'Signup successfully!', token, otp };
  }

  async sendOtp(dto: SendOtpDto) {
    const { email } = dto;

    const user = await this.userService.getUserOrThrow(email);

    const otp = await user.generateOtp();

    // todo: sign up on another mailing service or configure my mail to work with nodemailer

    // await this.emailService.sendEmailFromTemplate({
    //   to: email,
    //   templateId: EmailTemplate.OTP,
    //   dynamicTemplateData: { name: user.name.firstname, otp },
    // });

    return otp;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.userService.getUser(email);
    if (!user || !(await user.verifyPassword(password))) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const token = this.jwtService.sign({ sub: user.id });

    return { message: 'Login successful', token };
  }

  async verifyEmail(dto: VerifyOtpDto) {
    const { email, otp } = dto;

    const user = await this.userService.getUserOrThrow(email);

    if (!(await user.verifyOtp(otp)))
      throw new BadRequestException('OTP is invalid!');

    user.emailVerified = true;
    await user.save();

    return { message: 'Email verified successfully!' };
  }
}
