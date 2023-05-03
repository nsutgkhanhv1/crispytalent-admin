import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessments } from '@entity/assessments.entity';
import { AssessmentsRepository } from './assessments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Assessments])],
  providers: [AssessmentsRepository],
})
export class AssessmentsModules {}
