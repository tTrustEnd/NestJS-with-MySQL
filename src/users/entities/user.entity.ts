import { IsEmpty,IsNotEmpty,IsEmail, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(6, 30, { message: 'The password must be at least 6 but not longer than 30 characters' })
  @IsNotEmpty({ message: 'The password is required' })
  password!: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'The email is required' })
  username!: string;

  @Column()
  role!:string;

  @Column()
  name!:string;

  @Column()
  address!:string;

  @Column()
  phone!:string;

  @Column()
  age!:string;


  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

}
