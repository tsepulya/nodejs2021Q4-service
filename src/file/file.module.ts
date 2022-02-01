import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
// import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
