import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),UsersModule],
  controllers: [DatabasesController],
  providers: [DatabasesService]
})
export class DatabasesModule {}
