import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { configuration } from './config';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { CooperativeModule } from './Cooperative/cooperative.module';
import { LoanModule } from './Loan/loan.module';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get<string>('db.uri'),
      };
    },
  }), AuthModule, UserModule, CooperativeModule, LoanModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }