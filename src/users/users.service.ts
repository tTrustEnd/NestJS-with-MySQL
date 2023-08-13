import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, QueryFailedError, Repository, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import aqp from 'api-query-params';
import { IUser } from './entities/user.interface';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Permission } from 'src/permissions/entities/permission.entity';
import { query } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,

    private dataSource: DataSource,
  ) { }


 
  async findAll(query: string, current: number, pagesize: number) {
    const { filter } = aqp(query);
    const offset = (current - 1) * pagesize;
    delete filter.current;
    delete filter.pagesize;
    const total = (await this.usersRepository.find()).length;
    const users = await this.usersRepository.find({
      where: filter,
      skip: offset,
      take: pagesize,
      select: ['id', 'username', 'role', 'name', 'address', 'age',],
    });

    return {
      meta:{
        current:current,
        pagesize:pagesize,
        pages:Math.ceil(total/pagesize),
        total:total,
      },
      users
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id })
      const permissions = await this.permissionsRepository.find({where:{role:Like(`%${user.role}%`)}})
      delete user.password;
      user.permissions=permissions
      return user;
    } catch (error) {
      throw new BadRequestException("Không tồn tại user")
    }
  }

  async remove(id: string, user: IUser) {
    return await this.usersRepository.update(id, { isDeleted: true, deletedBy: user.username, deleted_at: new Date });
  }

  async create(createUserDto: CreateUserDto, user: IUser) {
    const pass = this.HashPassWord(createUserDto.password)
    createUserDto.password = pass;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createdUser = await this.usersRepository.save({
        ...createUserDto,
        createdBy: user?.username,
        created_at: new Date()
      });
      await queryRunner.commitTransaction();
      return createdUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    const pass = this.HashPassWord(updateUserDto.password)
    updateUserDto.password = pass;
    const { password, name, address, phone, age, role } = updateUserDto;
    return await this.usersRepository.update(id, {
      password, name, address, phone, age, role, updateBy: user.username, updated_at: new Date
    });
  }

  async updateToken(refresh_token:any,id:string){
      return await this.usersRepository.update(id,{refresh_token})
  }
  HashPassWord = (pass: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(pass, salt);
    return hash
  }
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async findUserbyRefresh_token(refresh_token: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ refresh_token, isDeleted: false });
  }
  async findUserbyemail(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username, isDeleted: false });
  }
} 
