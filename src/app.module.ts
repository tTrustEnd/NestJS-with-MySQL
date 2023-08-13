import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';
import { ConnectionOptions } from 'mysql2';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/entities/job.entity';
import { FilesModule } from './files/files.module';
import { FilesmanyModule } from './filesmany/filesmany.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from './permissions/entities/permission.entity';
import { DatabasesModule } from './databases/databases.module';
import { MailModule } from './mail/mail.module'; 
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
     isGlobal: true ,
     ttl:3
    }),ConfigModule.forRoot({
    envFilePath: ['.env', '.env.development'],
  ignoreEnvFile: true,
     isGlobal: true,
  }),ScheduleModule.forRoot(),
  
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
   type: 'mysql',
    host: configService.get<string>('HOST'),
    port: +configService.get<string>('PORT_DATABASE'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE'),
    entities: [User,Company,Job,Permission],
    synchronize: true,
    uuidExtension: 'uuid-ossp', // Thêm extension uuid-ossp
    uuidGeneration: 'uuid', // Sử dụng kiểu UUID
    } as ConnectionOptions),
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([Company, Job]),
  // TypeOrmModule.forFeature([User, Permission]),


  ConfigModule.forRoot({
    isGlobal: true
  }),

    UsersModule,

    AuthModule,

    CompaniesModule,

    JobsModule,

    FilesModule,

    FilesmanyModule,

    PermissionsModule,

    DatabasesModule,

    MailModule,



],
  controllers: [AppController],
  providers: [AppService,Logger],
})
  export class AppModule { }
