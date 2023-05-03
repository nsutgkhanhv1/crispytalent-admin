import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from '@entity';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async findAndCountAllUsers(params: {
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
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
