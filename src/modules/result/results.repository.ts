import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Results } from '@entity/result.entity';

@Injectable()
export class ResultsRepository extends Repository<Results> {
  constructor(private dataSource: DataSource) {
    super(Results, dataSource.createEntityManager());
  }

  async findAndCountResults(params: {
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
