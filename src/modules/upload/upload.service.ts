import { Injectable } from '@nestjs/common';
import { StorageService } from '@modules/vendor/storage/storage.service';
import { File } from '@interfaces/file.interface';

@Injectable()
export class UploadService {
  constructor(protected storageService: StorageService) {}

  async upload(files: Array<File>) {
    const paths = await this.storageService.upload(files);
    const objectUrl = await this.storageService.getObjectUrl(paths);

    if (files.length === 1) {
      return { file: objectUrl[0] };
    }
    return { files: objectUrl };
  }
}
