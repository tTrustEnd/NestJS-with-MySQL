import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesmanyController } from './filesmany.controller';
import { FilesmanyService } from './filesmany.service';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './public/images'); // Đường dẫn thư mục lưu trữ tệp tin
        },
        filename: (req, file, cb) => {
          const extension = path.extname(file.originalname);
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extension); // Tên tệp tin mới
        },
      }),
    }),
  ],
  controllers: [FilesmanyController],
  providers: [FilesmanyService],
})
export class FilesmanyModule {}
