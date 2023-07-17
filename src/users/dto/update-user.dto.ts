import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id!: number;
}
