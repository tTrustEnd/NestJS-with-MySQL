import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { MESSAGERESPONSE, User } from 'decorator/customize';
import { IUser } from 'src/users/entities/user.interface';


@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @MESSAGERESPONSE("Create a Permission")
 async create(@Body() createPermissionDto: any,@User() user:IUser) {
 const promises  = createPermissionDto.map(async(item) => {return await this.permissionsService.create(item,user)})
 const results = await Promise.all(promises);
  return results
  }

  @Get()
  findAll(@Query() query:string,
  @Query("current") current:number,
  @Query("pagesize") pagesize:number,
  ) {
    return this.permissionsService.findAll(query,current,pagesize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto,@User() user:IUser) {
    return this.permissionsService.update(id, updatePermissionDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.permissionsService.remove(id,user);
  }
}
