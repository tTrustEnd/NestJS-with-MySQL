import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class FilesmanyService {
  async saveFiles(file: Express.Multer.File): Promise<string> {
    const filename = file.originalname;
    const extension = path.extname(filename);
    const baseName = path.basename(file.originalname, extension);
    const newFilename = `${baseName}-${Date.now()}${extension}`;
    const destination = path.join(__dirname, '..', '../../public/images', newFilename);
    await fs.move(file.path, destination);

    return newFilename;
  }
}
