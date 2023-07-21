import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    role!: string;

    @ManyToOne(() => User, user=> user.permissions)
    apiPaths!: User[];

    @Column()
    apiPath!: string;

    @Column()
    method!: string;

    @Column()
    module!: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ default: null })
    updated_at: Date;

    @Column({ default: null })
    deleted_at: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: null })
    createdBy!: string

    @Column({ default: null })
    updateBy!: string
    @Column({ default: null })
    deletedBy!: string
}
