import { Company } from "src/companies/entities/company.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn('uuid') 
    id!: string;
  
    @Column()
    name!: string;
  
    @Column()
    skills!: string;
  
    @Column()
    salary!: string;

    @Column({default:null})
    companyId!: string;

    @Column()
    quantity!: string;

    @Column()
    level!: string;

    @Column()
    description!: string;

    @Column({default:true})
    isActive!: boolean;

    @CreateDateColumn()
    created_at: Date;
  
    @Column({default:null})
    updated_at: Date;

    @ManyToOne(() => Company, company => company.jobs)
    company: Company[];

    @Column({default:null})
    startDate!: Date

    @Column({default:null})
    endDate!: Date

    @Column({default:null})
    deleted_at: Date;
  
    @Column({ default: false })
    isDeleted: boolean;

    @Column({default:null})
    createdBy!: string

    @Column({default:null})
    updateBy!: string
    @Column({default:null})
    deletedBy!: string
}
