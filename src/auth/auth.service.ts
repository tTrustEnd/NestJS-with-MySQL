import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/entities/user.interface';
import { Permission } from 'src/permissions/entities/permission.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserbyemail(username);
    if(user){
      const isValid = this.usersService.isValidPassword(pass, user.password)
      if (user && isValid) {
        delete user.password
        return user;
      }
    }else{
      throw new BadRequestException("thông tin đăng nhập không chính xác")
    }
    return null;
  }

  async login(user, response: Response) {
    const { id, username, role, name, address, phone,age } = user;
    const payload = {
      sub: id,
      username, role, name, address, phone, age, id
    };
    response.clearCookie('refresh_token')
    const refresh_token = this.createRefreshToken(payload)

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    })
    await this.usersService.updateToken(refresh_token, id)
    return {
      access_token: this.jwtService.sign(payload),
      user
    };
  }

  async refreshToken(refreshtoken: string, response: Response) {
    try {
      const verify = this.jwtService.verify(refreshtoken, {
        secret: this.configService.get<string>("JWT_SECRET_REFRESH_TOKEN")
      })
      if (verify) {
        const user = await this.usersService.findUserbyRefresh_token(refreshtoken)
        if (user) {
          const { id, username, role, name, address, phone, age } = user;
          const payload = {
            sub: id,
            username, role, name, address, phone, age, id
          };
          response.clearCookie('refresh_token')
          const refresh_token = this.createRefreshToken(payload)
          response.cookie('refresh_token', refresh_token, {
            httpOnly: true,
          })
          await this.usersService.updateToken(refresh_token, id)
          return {
            access_token: this.jwtService.sign(payload),
            user
          };

        } else {
          throw new BadRequestException("Token hết hạn hoặc không hợp lệ, vui lòng login")
        }
      }else{
        throw new BadRequestException("Token hết hạn hoặc không hợp lệ, vui lòng login")
      }

    } catch (error) {
      throw new BadRequestException("Token hết hạn hoặc không hợp lệ vui lòng login")

    }
  }

  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_TOKEN'),
      expiresIn: this.configService.get<string>('EXPIRES_REFRESH_TOKEN')
    })
    return refresh_token
  }

  async Register(body:CreateUserDto,user?:any){
    return await this.usersService.create(body,user)
  }

}