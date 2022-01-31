import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  FileInterceptor,
} from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('file')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, './src/saved-files');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.upload(file);
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string) {
    return this.fileService.getFile(filename);
  }
}
