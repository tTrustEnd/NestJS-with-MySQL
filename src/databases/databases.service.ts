import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DatabasesService {
    private readonly logger = new Logger(DatabasesService.name);

    constructor(
      @InjectRepository(User) // Thay thế 'YourEntity' bằng tên entity thật của bạn
      private readonly usersRepository: Repository<User>,
      private UsersService: UsersService, // Thay thế 'YourEntity' bằng tên entity thật của bạn
    ) {}
  
    async onModuleInit() {
      try {
        const count = await this.usersRepository.count();
        if (count === 0) {
          await this.createInitialData();
        }
      } catch (error) {
        this.logger.error('Error initializing data:', error.stack);
      }
    }
  
    private async createInitialData() {
      // Thực hiện tạo dữ liệu vào MySQL ở đây
      // Ví dụ:
      const user = await this.usersRepository.create({
        username:"admin@gmail.com",
        password:this.UsersService.HashPassWord("123456"),
        role:"Admin",
        name:"Truong",
        age:"23",
        address:"BN",
        created_at:new Date,
      })
      await this.usersRepository.save(user)
      this.logger.log('Initial data created successfully!');
    }

}
