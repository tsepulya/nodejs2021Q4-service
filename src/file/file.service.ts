import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    return `File ${file.filename} is successfully saved`;
  }

  getFile(filename: string) {
    if (!existsSync(`./src/saved-files/${filename}`)) {
      throw new NotFoundException(`There are no files with such name: ${filename}`);
    }
    
    const file = createReadStream(`./src/saved-files/${filename}`);
    return new StreamableFile(file);
    }
}
