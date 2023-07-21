import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesmanyService } from './filesmany.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesDto } from './dto/upload-files.dto';
import { MESSAGERESPONSE } from 'decorator/customize';

@Controller('files')
export class FilesmanyController {
  constructor(private readonly filesmanyService: FilesmanyService) { }

  @Post('uploads')
  @MESSAGERESPONSE("upload many file")
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: UploadFilesDto['files']) {
    const savedFilenames = await Promise.all(files.map(file => this.filesmanyService.saveFiles(file)));
    return { filenames: savedFilenames };
  }
}
