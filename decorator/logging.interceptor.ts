import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { MESSAGE_RESPONSE } from './customize';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor( private reflector:Reflector){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        
    return next.handle().pipe(
        map((data) => ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: this.reflector.getAllAndOverride<boolean>(MESSAGE_RESPONSE, [context.getHandler(), context.getClass(),]
              ),
            data:data
          })),
    );
  }
}
