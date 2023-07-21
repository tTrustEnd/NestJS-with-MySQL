import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { ConflictException } from '@nestjs/common';

export class CreateUserDto {
    @PrimaryGeneratedColumn('uuid') 
    id!: string;

    @Column()
    @IsNotEmpty({message:'password không được để trống'})
    password!: string;
  
    @Column({ unique: true })
    @IsNotEmpty({message:'email không được để trống'})
    @IsEmail({},{message:"định dạng phải là @gmail.com"})
    username!: string;
  
    @Column({default:"user"})
    role!:string;
  
    @Column()
    @IsNotEmpty({message:'name không được để trống'})
    name!:string;
  
    @Column()
    @IsNotEmpty({message:'gender không được để trống'})
    gender!:string;

    @Column()
    @IsNotEmpty({message:'address không được để trống'})
    address!:string;
  
    @Column()
    @IsNotEmpty({message:'phone không được để trống'})
    phone!:string;
  
    @Column()
    @IsNotEmpty({message:'age không được để trống'})
    age!:string;

  
}
