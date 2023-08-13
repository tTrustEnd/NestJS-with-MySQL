import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private permissionsService: PermissionsService,
    private usersService: UsersService
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    const permissions = await this.permissionsService.findPermission(user)
    user.permission = permissions;
    if (!user) {
      throw new UnauthorizedException("Sai thông tin đăng nhập");
    }
    delete user.permission;
    return user;
  }

}