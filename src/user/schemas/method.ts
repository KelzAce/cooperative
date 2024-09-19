import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

type VerifyPassword = (this: UserDocument, password: string) => Promise<Boolean>;

type GenerateOtp = (this: UserDocument) => Promise<string>;

type VerifyOtp = (
  this: UserDocument,
  otp: string,
) => Promise<boolean | 'expired'>;

export interface UserMethods {
  verifyPassword: VerifyPassword;
  generateOtp: GenerateOtp;
  verifyOtp: VerifyOtp;
}

const verifyPassword: VerifyPassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  if (!isValid) {
    throw new UnauthorizedException('Password is incorrect!');
  }
  return isValid
};

const generateOtp: GenerateOtp = async function () {
  const otp = crypto.randomUUID().slice(0, 6).toUpperCase();

  this.otp = {
    data: await bcrypt.hash(otp, 10),
    expires: new Date(Date.now() + 600_000),
  };

  await this.save();

  return otp;
};

const verifyOtp: VerifyOtp = async function (otp) {
  if (!this?.otp?.expires || !this?.otp?.data) return false;

  const now = new Date();

  if (now >= this.otp.expires) {
    this.otp = {};
    await this.save();
    return 'expired';
  }

  return await bcrypt.compare(otp, this.otp.data);
};

export const userMethods = [verifyPassword, generateOtp, verifyOtp];