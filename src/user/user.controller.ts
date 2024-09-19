// src/user/user.controller.ts
import { Controller, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from './entities/role.enum';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('verify-member/:id')
  async verifyMember(id: number, bvn: string, bankAccountNumber: string, photoUrl: string, verifierRole: string) {
    // Convert verifierRole to Role enum
    const role = Role[verifierRole as keyof typeof Role];
  
    if (!role) {
      throw new Error('Invalid role');
    }
  
    return this.userService.verifyMember(id, bvn, bankAccountNumber, photoUrl, role);
  }
}
