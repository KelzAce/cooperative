import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/User/user.module';
import { EmailService } from 'src/Email/email.service';
import { CooperativeModule } from 'src/Cooperative/cooperative.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow<string>('jwt.secret'),
          signOptions: {
            issuer: configService.getOrThrow<string>('jwt.issuer'),
            expiresIn: configService.getOrThrow<string>('jwt.expiresIn'),
          },
          verifyOptions: {
            issuer: configService.getOrThrow<string>('jwt.issuer'),
          },
        };
      },
    }),
    UserModule,
    CooperativeModule
  ],
  providers: [AuthService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
