import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity({ name: 'users' })
@Unique(['email'])
export class CreateUserDto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    password!: string;
  
    @Column({ unique: true })
    @IsNotEmpty()
    username!: string;
  
    @Column()
    @IsNotEmpty()
    role!:string;
  
    @Column()
    @IsNotEmpty()
    name!:string;
  
    @Column()
    @IsNotEmpty()
    address!:string;
  
    @Column()
    @IsNotEmpty()
    phone!:string;
  
    @Column()
    @IsNotEmpty()
    age!:string;
}
