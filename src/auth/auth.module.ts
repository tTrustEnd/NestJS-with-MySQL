
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/auth/local.strategy'; 
import { AuthController } from './auth.controller'; 
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,PermissionsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory:async (configService: ConfigService) => ({
        secret:configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("EXPIRES_ACCESS_TOKEN") },
      }),  inject: [ConfigService],
    
    }
    ),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
