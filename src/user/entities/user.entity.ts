// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Status } from './role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  bvn: string;

  @Column({ nullable: true })
  bankAccountNumber: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Member,
  })
  role: Role;

  @Column({ 
    type: 'enum',
    enum: Status,
    default: 'pending' 
  })
  status: string; // pending or verified
}
