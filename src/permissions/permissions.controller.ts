import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { MESSAGERESPONSE, User } from 'decorator/customize';
import { IUser } from 'src/users/entities/user.interface';
import { UsersService } from 'src/users/users.service';


@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService,
    ) {}

  @Post()
  @MESSAGERESPONSE("Create a Permission")
 async create(@Body() createPermissionDto: any,@User() user:IUser) {
 const promises  = createPermissionDto.map(async(item) => {return await this.permissionsService.create(item,user)})
 const results = await Promise.all(promises);
  return results
  }

  @Get()
  @MESSAGERESPONSE("get Permission with paginate")
  findAll(@Query() query:string,
  @Query("current") current:number,
  @Query("pagesize") pagesize:number,
  ) {
    return this.permissionsService.findAll(query,current,pagesize);
  }

  @Get(':id')
  @MESSAGERESPONSE("find a Permission by id")
  findOne(@Param('id',new ParseUUIDPipe()) id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @MESSAGERESPONSE("update a Permission")
  update(@Param('id',new ParseUUIDPipe()) id: string, @Body() updatePermissionDto: UpdatePermissionDto,@User() user:IUser) {
    return this.permissionsService.update(id, updatePermissionDto,user);
  }

  @Delete(':id')
  @MESSAGERESPONSE("delete a Permission")
  remove(@Param('id',new ParseUUIDPipe()) id: string,@User() user:IUser) {
    return this.permissionsService.remove(id,user);
  }
}
