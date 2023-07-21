import { IsNotEmpty } from "class-validator";
import { Job } from "src/jobs/entities/job.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class CreateCompanyDto {
    @PrimaryGeneratedColumn('uuid') 
    id!: string;
  
    @Column()
    @IsNotEmpty({message:"tên companies không được để trống"})
    name!: string;
  
    @Column()
    @IsNotEmpty({message:"address không được để trống"})
    address!: string;
  
    @Column()
    @IsNotEmpty({message:"description không được để trống"})
    description!: string;

    @Column()
    @IsNotEmpty({message:"logo không được để trống"})
    logo!: string;

    jobId:string[]
   
}
