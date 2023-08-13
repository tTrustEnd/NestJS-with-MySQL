import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
   Query, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MESSAGERESPONSE, Public, User } from 'decorator/customize';
import { IUser } from './entities/user.interface';
import { CacheInterceptor } from '@nestjs/cache-manager/dist';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @MESSAGERESPONSE("create users ")
  create(@Body() createUserDto: CreateUserDto,@User() user:IUser) {
    return this.usersService.create(createUserDto,user);
  }

  @Get()
  @MESSAGERESPONSE("find users with paginate ")
  findAll(@Query() query:string,
  @Query('current') current:number,
  @Query('pagesize') pagesize:number,

  ){
    return this.usersService.findAll(query,current,pagesize);
  }
  @Get(':id')
  @MESSAGERESPONSE("find users by id")
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.usersService.findOne(id);
    return user

  }

  @Patch(':id')
  @MESSAGERESPONSE("update users by id")
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto,@User() user:IUser) {
    return this.usersService.update(id, updateUserDto,user);
  }

  @Delete(':id')
  @MESSAGERESPONSE("delete users by id ")
  remove(@Param('id', new ParseUUIDPipe()) id: string,@User() user:IUser) {
    return this.usersService.remove(id,user);
  }
}
