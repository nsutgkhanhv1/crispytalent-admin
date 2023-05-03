import * as path from 'path';
import * as fs from 'fs';
import { env } from '@env';

export class LocalDisk {
  private root = path.join(env.appPath, '..', env.app.disksDir);

  public async upload(files: any) {
    try {
      if (Array.isArray(files)) {
        const paths = await Promise.all(
          files.map(async (file) => {
            return this.uploadFile(file.originalname, file.buffer);
          }),
        );
        return paths.map((path) => ({ path }));
      }

      const path = await this.uploadFile(files.originalname, files.buffer);
      return {
        path,
      };
    } catch {
      return undefined;
    }
  }

  public async uploadFile(
    fileName: string,
    content: string | Buffer,
    encoding?: string,
  ): Promise<void> {
    const newFileName = Date.now() + '-' + fileName;
    const newFilePath = this.root + '/' + newFileName;

    return new Promise<any>((resolve, reject) => {
      if (!newFilePath || !newFilePath.trim())
        return reject(new Error('The path is required!'));
      if (!content) return reject(new Error('The content is required!'));

      const dir = path.dirname(newFilePath);

      if (!fs.existsSync(dir)) this.createDirectory(dir);

      if (dir === newFilePath.trim())
        return reject(new Error('The path is invalid!'));

      fs.writeFile(newFilePath, content, { encoding } as any, (error) => {
        if (error) return reject(error);
        resolve(newFileName);
      });
    });
  }

  public createDirectory(dir: string): void {
    const splitPath = dir.includes('//') ? dir.split('//') : dir.split('/');
    if (splitPath.length > 20) throw new Error('The path is invalid!');
    splitPath.reduce((path, subPath) => {
      let currentPath;
      if (subPath !== '.') {
        currentPath = path + '/' + subPath;
        if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);
      } else currentPath = subPath;
      return currentPath;
    }, '');
  }
}
