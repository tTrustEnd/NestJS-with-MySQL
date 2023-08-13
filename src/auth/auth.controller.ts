import { Controller,Post, UseGuards, Get,Req ,Res, Body,} from '@nestjs/common';
import { LocalAuthGuard } from './passport/auth/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './passport/auth/jwt-auth.guard';
import { MESSAGERESPONSE, Public, User } from 'decorator/customize';
import { Request,Response } from 'express';
import { IUser } from 'src/users/entities/user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Public()
    @MESSAGERESPONSE("Login")
    @Post('login')
    async login(@Req() req,@Res({ passthrough: true }) response: Response) {
      return this.authService.login(req.user,response);
    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @MESSAGERESPONSE("Get profile")
    getProfile(@Req() req) {
      return req.user;
    }

    @Public()
    @Post('register')
    @MESSAGERESPONSE("register")
    register(@Body() body: CreateUserDto) {
      const user = [];
      return this.authService.Register(body,user);
    }

    @Public()
    @Get('refresh')
    @MESSAGERESPONSE("Get refresh_token")
    refreshToken(@Req() request: Request,@Res({ passthrough: true }) response: Response) {
      return this.authService.refreshToken(request.cookies['refresh_token'],response);
    }
}