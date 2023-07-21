import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'decorator/customize';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector,
  ) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
  // Add your custom authentication logic here
  // for example, call super.logIn(request) to establish a session.

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException("Token không hợp lệ vui lòng đăng nhập");
    }
    const request = context.switchToHttp().getRequest();
    const apiPath = request.route.path
    const method = request.method;    
    const permission = user?.user?.permissions || [];
    const isExis = permission.map(item => (item.apiPath === apiPath && item.method === method))
    const isExix = isExis?.find(item => item===true);
    if(isExix){
      return user;
    }else{
     throw new BadRequestException("Bạn không có quyền truy cập enpoint này")
    }

  }
}