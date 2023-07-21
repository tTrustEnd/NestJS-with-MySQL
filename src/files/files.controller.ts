import { Controller, HttpException, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { MESSAGERESPONSE } from 'decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @MESSAGERESPONSE("upload files")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /(png|image\/png|jpg|jpeg)$/,
      })
      .addMaxSizeValidator({
        maxSize: 10000000, // just to you know it's possible.
      })
      .build({
        exceptionFactory(error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        },
      }),
  )
  file: Express.Multer.File) {
    const savedFilename = await this.filesService.saveFile(file);
    return { filename: savedFilename };
  }

}
