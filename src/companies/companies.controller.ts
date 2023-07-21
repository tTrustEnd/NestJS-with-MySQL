import {Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { MESSAGERESPONSE, User } from 'decorator/customize';
import { IUser } from 'src/users/entities/user.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @MESSAGERESPONSE("create companies")
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @MESSAGERESPONSE("get companies with paginate")
  findAll(
    @Query() query: string,
    @Query('current') current: number,
    @Query('pagesize') pagesize: number,

  ) {
    return this.companiesService.findAll(query, current, pagesize);
  }
  @MESSAGERESPONSE("get companies by id")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @MESSAGERESPONSE("update companies")
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @MESSAGERESPONSE("delete companies ")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
