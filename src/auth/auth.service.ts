import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserbyemail(username);
    // const pass2 = this.usersService.HashPassWord(pass)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const { username, role, name, address, phone, age } = user;
    const payload = {
      sub: user.userId,
    username,role,name,address,phone,age
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

}