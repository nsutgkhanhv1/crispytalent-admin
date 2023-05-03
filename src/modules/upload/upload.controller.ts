import {
  Controller,
  BadRequestException,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { createFileUploadOption } from '@common/lib/file';
import { UploadService } from './upload.service';
import { File } from '@interfaces/file.interface';
import { FileEnum } from '@common/enum/file.enum';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('/image')
  @UseInterceptors(
    FilesInterceptor(
      'files',
      FileEnum.MAX_QTY_IMAGE,
      createFileUploadOption(
        /\/(jpg|jpeg|png|gif)$/,
        FileEnum.MAX_SIZE_IMAGE,
        FileEnum.MAX_QTY_IMAGE,
      ),
    ),
  )
  async uploadImage(
    @UploadedFiles()
    files: Array<File>,
  ) {
    if (files.length <= 0) {
      throw new BadRequestException('Is not file');
    }

    const data = await this.uploadService.upload(files);
    return { ...data, status: 'success', message: 'Upload success!' };
  }
}
