import { IsFileType } from "decorator/customize";

export class UploadFilesDto {
  @IsFileType({ message: 'Only PNG, JPG, and JPEG files are allowed.' })
  files: Express.Multer.File[];
}
