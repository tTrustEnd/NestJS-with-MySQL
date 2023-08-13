import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const MESSAGE_RESPONSE = 'MESSAGERESPONSE';
export const MESSAGERESPONSE = (message:string) => SetMetadata(MESSAGE_RESPONSE, message);

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.user;
  },
);
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isFileType', async: false })
export class IsFileTypeConstraint implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File) {
    const fileTypeRegex = /\.(png|jpe?g)$/i;
    return fileTypeRegex.test(file.originalname);
  }
}

export function IsFileType(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isFileType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsFileTypeConstraint,
    });
  };
}