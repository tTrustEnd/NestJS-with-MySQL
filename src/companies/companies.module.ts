import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Job } from 'src/jobs/entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company,Job])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports:[TypeOrmModule,CompaniesService]
})
export class CompaniesModule {}
