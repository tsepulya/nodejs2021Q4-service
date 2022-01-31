import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    return `File ${file.filename} is successfully saved`;
  }

  findOne(filename: string) {
    return `This action returns a #${filename} file`;
  }
}
