import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/entities/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import aqp from 'api-query-params';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Company } from 'src/companies/entities/company.entity';
@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,

  ) { }
  async create(createjobDto: CreateJobDto, user: IUser) {
    return await this.jobsRepository.save({ ...createjobDto, createdBy: user.username });
  }

  async findAll(query: string, current: number, pagesize: number) {
    const { filter } = aqp(query)
    const total = (await this.jobsRepository.find()).length;
    delete filter.current
    delete filter.pagesize
    filter.isDeleted = false;
    const offset = (current - 1) * pagesize
    const jobs = await this.jobsRepository.find({
      where: filter,
      skip: offset,
      take: pagesize,
    });
    return {
      meta: {
        current: current,
        pagesize: pagesize,
        pages: Math.ceil(total / pagesize),
        total: total,
      },
      jobs
    }
  }

  async findOne(id: string): Promise<Job> {
    try {
      const job = await this.jobsRepository.findOneBy({ id, isDeleted: false });
      const company = await this.companiesRepository.find({ where: { id: job.companyId } })
      job.company = company
      return job

    } catch (error) {
      throw new BadRequestException("Không tìm thấy job")
    }
  }

  async update(id: string, updatejobDto: UpdateJobDto, user: IUser) {
    try {
      const job = await this.jobsRepository.findOneBy({ id })
      if (job) {
        return await this.jobsRepository.update(id, { ...updatejobDto, updateBy: user.username, updated_at: new Date });

      } else {
        throw new BadRequestException("Không tìm thấy jobs")
      }
    } catch (error) {
      throw new BadRequestException("Không tìm thấy job")

    }
  }

  async remove(id: string, user: IUser) {
    return await this.jobsRepository.update(id, { isDeleted: true, deletedBy: user.username, deleted_at: new Date });
  }
}
