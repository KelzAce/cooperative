import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { userMethods } from './schemas/method';
import { UserController } from './user.controller';
import { preSave } from './schemas/middleware';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          // Add middleware
          schema.pre('save', preSave);

          // Add methods
          for (const userMethod of userMethods) {
            schema.method(userMethod.name, userMethod);
          }

          schema.index(
            { createdAt: -1 },
            {
              expires: '1d',
              partialFilterExpression: { emailVerified: false },
            },
          );

          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
