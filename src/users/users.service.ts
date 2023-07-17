import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async create(createUserDto: User) {
    // const pass = this.HashPassWord(createUserDto.password);
    return await this.usersRepository.save(

      createUserDto

    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const pass = this.HashPassWord(updateUserDto.password)
    updateUserDto.password = pass;
    return await this.usersRepository.update(id, updateUserDto);
  }
  HashPassWord = (pass: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(pass, salt);
    return hash

  }
  async findUserbyemail(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username });
  }
} 
