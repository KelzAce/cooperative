// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Method to find a user by ID
  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Method to find a user by email
  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Method to save or update a user
  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Method to verify a member
  async verifyMember(userId: number, bvn: string, bankAccountNumber: string, photoUrl: string, verifierRole: Role) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (user.status === 'verified') throw new Error('User already verified');

    if (verifierRole === Role.President || verifierRole === Role.FinancialSecretary) {
      user.bvn = bvn;
      user.bankAccountNumber = bankAccountNumber;
      user.photoUrl = photoUrl;
      user.status = 'verified';
      return this.userRepository.save(user);
    } else {
      throw new Error('Unauthorized to verify members');
    }
  }
}
