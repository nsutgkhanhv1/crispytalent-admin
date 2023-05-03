import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { VendorModule } from '@modules/vendor/vendor.module';

@Module({
  imports: [VendorModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
