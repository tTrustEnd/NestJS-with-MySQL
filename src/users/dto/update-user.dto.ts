import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['username']) {
    // Chỉ cho phép nhập id và password
  
  }