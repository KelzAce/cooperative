import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserMethods } from './schemas/method';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    readonly userModel: Model<User, object, UserMethods>,
  ) {}

  async getUser(email: string) {
    const user = this.userModel.findOne({ email }).exec();

    return user;
  }

  async getUserOrThrow(email: string) {
    const user = this.getUser(email);

    if (!user) throw new NotFoundException("User doesn't exist!");

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const { firstname, lastname, email, password } = dto;

    const userExists = await this.getUser(email);
    if (userExists) {
      throw new BadRequestException(`The email: "${email}" is already taken`);
    }

    const user = await this.userModel.create({
      name: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    return user;
  }

  
}
