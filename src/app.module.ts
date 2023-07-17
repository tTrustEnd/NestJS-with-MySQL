import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({
  ignoreEnvFile: true,
     isGlobal: true,
  }),
  
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
   type: 'mysql',
    host: configService.get<string>('HOST'),
    port: +configService.get<string>('PORT_DATABASE'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE'),
    entities: [User,],
    synchronize: true,
    }),
    inject: [ConfigService],
  }),
  ConfigModule.forRoot({
    isGlobal: true
  }),

    UsersModule,

    AuthModule,

],
  controllers: [AppController],
  providers: [AppService],
})
  export class AppModule { 
  }
