import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsRepository } from './tests.repository';
import { Tests } from '@entity/tests.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tests])],
  providers: [TestsRepository],
})
export class TestsModules {}
