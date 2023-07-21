import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'src/users/entities/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { User } from './../../decorator/customize';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission)
  private permissionsRepository: Repository<Permission>,) { }

  async create(createPermissionDto: CreatePermissionDto, user: any) {
    const result = await this.permissionsRepository.save({ ...createPermissionDto, createdBy: user.username });
    if (result) {
      return result
    }
  }

  async findAll(query: string, current: number, pagesize: number) {
    const { filter } = aqp(query);
    delete filter.current;
    delete filter.pagesize;
    const offset = (current - 1) * pagesize;
    const total = (await this.permissionsRepository.find()).length;
    const permissions = await this.permissionsRepository.find({
      where: filter,
      skip: offset,
      take: pagesize
    })
    if (permissions && permissions.length > 0) {
      return {
        meta: {
          current: current,
          pagesize: pagesize,
          page: Math.ceil(total / pagesize),
          total: total
        },
        permissions
      }
    } else {
      throw new BadRequestException("không tìm thấy Permission nào cả")
    }
  }

  async findOne(id: string) {
    const permission = await this.permissionsRepository.findOneBy({ id, isDeleted: false })
    if (permission) {
      return permission
    } else {
      throw new BadRequestException("không tìm thấy permission")
    }

  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    const permission = await this.permissionsRepository.findOneBy({ id, isDeleted: false })
    if (permission) {
      return await this.permissionsRepository.update(id, { ...updatePermissionDto, updateBy: user.username, updated_at: new Date })
    } else {
      throw new BadRequestException("không tìm thấy permission")
    }
  }

  async remove(id: string, user: IUser) {
    const permission = await this.permissionsRepository.findOneBy({ id, isDeleted: false })
    if (permission) {
      return await this.permissionsRepository.update(id, { isDeleted: true, deletedBy: user.username, deleted_at: new Date })
    } else {
      throw new BadRequestException("không tìm thấy permission")
    }
  }
  async findPermission(user) {
    const permission = await this.permissionsRepository.find({ where: { role: user.role } })
    return permission
  }
}
