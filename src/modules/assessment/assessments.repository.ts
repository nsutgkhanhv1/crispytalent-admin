import { Assessments } from '@entity/assessments.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AssessmentsRepository extends Repository<Assessments> {
  constructor(private dataSource: DataSource) {
    super(Assessments, dataSource.createEntityManager());
  }

  async findAndCountAssessments(params: {
    search: any;
    order: object;
    skip: number;
    take: number;
  }): Promise<any> {
    const { search, order, skip, take } = params;
    return await this.findAndCount({
      where: search,
      order,
      skip,
      take,
    });
  }
}
