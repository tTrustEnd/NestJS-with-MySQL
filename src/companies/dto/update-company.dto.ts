import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { Column } from 'typeorm';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
 
}
