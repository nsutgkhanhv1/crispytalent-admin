import { Injectable } from '@nestjs/common';
import { env } from '@env';
import { LocalDisk } from './Providers/local.disk.provider';

@Injectable()
export class StorageService {
  protected disk: any;

  constructor() {
    this.setDisk(env.app.fileSystemDriver);
  }

  public setDisk(disk: string) {
    switch (disk) {
      case 'server':
        this.disk = new LocalDisk();
        break;
      default:
        break;
    }

    return this;
  }

  public async upload(files: any) {
    return await this.disk.upload(files);
  }

  public createDirectory(dir: string) {
    return this.disk.createDirectory(dir);
  }

  public async getObjectUrl(paths) {
    const urls = [];
    if (env.app.fileSystemDriver === 'server') {
      paths.map((path) => {
        urls.push(env.app.urlApi + '/public/uploads/' + path.path);
      });
    }

    return urls;
  }
}
