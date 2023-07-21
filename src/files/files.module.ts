import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';

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
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
