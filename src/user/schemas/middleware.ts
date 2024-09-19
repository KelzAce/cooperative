import { PreSaveMiddlewareFunction } from 'mongoose';
import { UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

export const preSave: PreSaveMiddlewareFunction<UserDocument> = async function (
  next,
) {
  try {
    if (this.isModified('password')) {
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
    }

    next();
  } catch (err) {
    next(err);
  }
};