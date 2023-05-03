import { Tests } from '@entity/tests.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TestsRepository extends Repository<Tests> {
  constructor(private dataSource: DataSource) {
    super(Tests, dataSource.createEntityManager());
  }

  async findAndCountTests(params: {
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
