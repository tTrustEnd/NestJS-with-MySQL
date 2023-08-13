import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { MESSAGE_RESPONSE } from './../../../decorator/customize';

export class UpdateUserDto extends OmitType(CreateUserDto, ['username']) {

  
  }