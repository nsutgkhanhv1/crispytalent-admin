import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsRepository } from './topics.repository';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { VendorModule } from '@modules/vendor/vendor.module';
import { Topics } from '@entity/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topics]), VendorModule],
  controllers: [TopicsController],
  providers: [TopicsService, TopicsRepository],
})
export class TopicsModule {}
