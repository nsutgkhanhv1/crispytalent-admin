import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Topics } from '@entity/topic.entity';
import { CreateTopicInterface } from './topics.interface';

@Injectable()
export class TopicsRepository extends Repository<Topics> {
  constructor(private dataSource: DataSource) {
    super(Topics, dataSource.createEntityManager());
  }

  async findAndCountTopics(params: {
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

  async createBulkTopic(params: CreateTopicInterface[]) {
    const topicsCreate = params.map((item) => {
      return this.create(item);
    });
    const saveEntity = topicsCreate.map((topicEntity) => {
      return this.insert(topicEntity);
    });
    await Promise.all(saveEntity);
  }
}
