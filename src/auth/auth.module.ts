
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/auth/local.strategy'; 
import { AuthController } from './auth.controller'; 
import { jwtConstants } from './passport/auth/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/auth/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
