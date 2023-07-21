import { Job } from "src/jobs/entities/job.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid') 
    id!: string;
  
    @Column()
    name!: string;
  
    @Column()
    address!: string;
  
    @Column()
    description!: string;

    @Column()
    logo!: string;

    @CreateDateColumn()
    created_at: Date;
  
    @Column({default:null})
    updated_at: Date;
    
    @OneToMany(() => Job, job => job.company)
    jobs: Job[];

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
