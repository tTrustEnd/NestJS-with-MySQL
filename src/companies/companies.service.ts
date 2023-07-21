import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { IUser } from 'src/users/entities/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import aqp from 'api-query-params';
import { Job } from 'src/jobs/entities/job.entity';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

  ) { }
  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    if (createCompanyDto && createCompanyDto.jobId) {
      //tạo đối tượgn company ở bộ nhớ, không tương tác database
      const company = await this.companiesRepository.create({ ...createCompanyDto, createdBy: user.username })
      const jobs = await this.jobRepository.findByIds(createCompanyDto.jobId)
      if (jobs.length > 0) {
        //lưu lại đối tượng vào database
        return this.companiesRepository.save(company)
      } else {
        throw new BadRequestException("không tìm thấy jobs trong database")
      }
    }
    return await this.companiesRepository.save({ ...createCompanyDto, createdBy: user.username });
  }

  async findAll(query: string, current: number, pagesize: number) {
    const { filter } = aqp(query)
    const total = (await this.companiesRepository.find()).length;
    delete filter.current
    delete filter.pagesize
    filter.isDeleted = false;
    const offset = (current - 1) * pagesize
    const companies = await this.companiesRepository.find({
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
      companies
    }
  }

  async findOne(id: string): Promise<Company> {
    try {
      const company = await this.companiesRepository.findOneBy({ id, isDeleted: false });
      const jobs = await this.jobRepository.find({ where: { companyId: company.id } });
      company.jobs = jobs;
      return company
    } catch (error) {
      throw new BadRequestException("Không tìm thấy company")
    }
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    try {
      const company = await this.companiesRepository.findOneBy({ id })
      if (company) {
        return await this.companiesRepository.update(id, { ...updateCompanyDto, updateBy: user.username, updated_at: new Date });

      } else {
        throw new BadRequestException("Không tìm thấy company")
      }
    } catch (error) {
      throw new BadRequestException("Không tìm thấy company")

    }
  }

  async remove(id: string, user: IUser) {
    return await this.companiesRepository.update(id, { isDeleted: true, deletedBy: user.username, deleted_at: new Date });
  }
}
