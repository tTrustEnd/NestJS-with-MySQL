import {Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { MESSAGERESPONSE, User } from 'decorator/customize';
import { IUser } from 'src/users/entities/user.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  @MESSAGERESPONSE("create jobs")
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {

    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @MESSAGERESPONSE("get jobs with paginate")
  findAll(
    @Query() query: string,
    @Query('current') current: number,
    @Query('pagesize') pagesize: number,

  ) {
    return this.jobsService.findAll(query, current, pagesize);
  }
  @MESSAGERESPONSE("get jobs by id")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @MESSAGERESPONSE("update jobs")
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: IUser) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @MESSAGERESPONSE("delete jobs ")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
