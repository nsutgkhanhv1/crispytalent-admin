import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Results } from '@entity/result.entity';
import { ResultsRepository } from './results.repository';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { UsersRepository } from '@modules/users/users.repository';
import { AssessmentsRepository } from '@modules/assessment/assessments.repository';
import { TestsRepository } from '@modules/test/tests.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Results])],
  controllers: [ResultsController],
  providers: [
    ResultsService,
    ResultsRepository,
    UsersRepository,
    AssessmentsRepository,
    TestsRepository
  ],
})
export class ResultsModule {}
