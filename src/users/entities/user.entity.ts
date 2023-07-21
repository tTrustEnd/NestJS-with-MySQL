import { IsEmpty, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, AfterLoad, BeforeInsert, BeforeUpdate, BaseEntity, OneToMany } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { Permission } from 'src/permissions/entities/permission.entity';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') 
   id!: string;

  @Column()
  password!: string;

  @Column({ unique: true})
  username!: string;

  @Column({default:"User"})
  role!: string;

  @OneToMany(()=>Permission,permission=>permission.apiPath)
  permissions!: Permission[];

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  age!: string;

  @Column({default:null,length:10000})
  refresh_token:string

  @CreateDateColumn()
  created_at: Date;

  @Column({default:null})
  updated_at: Date;

  @Column({default:null})
  deleted_at: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({default:null})
  createdBy!: string

  @Column({default:null})
  updateBy!: string
  @Column({default:null})
  deletedBy!: string
  
 
}
