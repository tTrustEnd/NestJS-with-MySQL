import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  Req,
  Scope,
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

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException("Token không hợp lệ vui lòng đăng nhập");
    }
    //Nếu ta dùng getResponse thay vì Request thì dùng cái dưới .req để trỏ đến request
    // const request2 = context.switchToHttp().getResponse();
    // console.log(request2.req.route.path)

    const request = context.switchToHttp().getRequest();
    const apiPath = request.route.path
    const method = request.method;    
    const permission = user?.user?.permissions || [];
    const isExis = permission.map(item => (item.apiPath === apiPath && item.method === method))
    const isExix = isExis?.find(item => item===true);
    if(isExix){
      return user;
    }else{//
     throw new BadRequestException("Bạn không có quyền truy cập enpoint này")
    }

  }
}