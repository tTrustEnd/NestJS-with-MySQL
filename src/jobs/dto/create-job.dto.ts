import { IsNotEmpty } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateJobDto {
    @PrimaryGeneratedColumn('uuid') 
    id!: string;
    @Column()
    @IsNotEmpty({message:"name không được để trống"})
    name!: string;
  
    @Column()
    @IsNotEmpty({message:"skills không được để trống"})
    skills!: string;
  
    @Column()
    companyId!: string;

    @Column()
    @IsNotEmpty({message:"salary không được để trống"})
    salary!: string;

    @Column()
    @IsNotEmpty({message:"quantity không được để trống"})
    quantity!: string;

    @Column()
    @IsNotEmpty({message:"level không được để trống"})
    level!: string;

    @Column()
    @IsNotEmpty({message:"description không được để trống"})
    description!: string;

    @Column({default:null})
    @IsNotEmpty({message:"startDate không được để trống"})
    startDate!: Date

    @Column({default:null})
    @IsNotEmpty({message:"endDate không được để trống"})
    endDate!: Date
}
