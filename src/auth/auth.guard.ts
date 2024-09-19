import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { Types } from 'mongoose';
  import { UserService } from 'src/user/user.service';
  
  export type PopulatedRequest = Request & { user: { id: Types.ObjectId } };
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly usersService: UserService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // const contextType = context.getType();
  
      const className = context.getClass().name;
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not present!');
      }
  
      let payload;
      try {
        payload = await this.jwtService.verifyAsync(token);
      } catch {
        throw new UnauthorizedException('Invalid token!');
      }
  
      const user = await this.usersService.userModel
        .findById(payload.sub, '_id emailVerified')
        .lean()
        .exec();
  
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
  
      if (className !== 'AuthController') {
        if (!user.emailVerified) {
          throw new ForbiddenException("User's email is not verified!");
        }
      }
  
      request['user'] = { id: user._id };
  
      return true;
    }
  
    private extractTokenFromHeader(ctx: Request): string | undefined {
      const [type, token] = ctx.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }