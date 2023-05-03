import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { TopicsRepository } from './topics.repository';
import { Like } from 'typeorm';
import { CreateTopicInterface, TopicType } from './topics.interface';
import { getTemplate } from '@utils/getTemplate';
import { UpdateTopicDto } from './topics.dto';

@Injectable()
export class TopicsService {
  constructor(private topicsRepository: TopicsRepository) {}

  findTopicById(id: number) {
    return this.topicsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAllTopics(query: any): Promise<any> {
    const { draw, start, length, order, filter } = query;
    const filterCondition = this.createFilterQuery(filter);

    const [allTopicss, totalRecords] =
      await this.topicsRepository.findAndCountTopics({
        search: filterCondition,
        order: order,
        skip: start,
        take: length,
      });

    const updateButtonCompliled = getTemplate('common/button/update.hbs');
    const deleteButtonCompliled = getTemplate('common/button/delete.hbs');
    const paginationDataArr = allTopicss.map((topics) => {
      topics.action = `<td class="text-center"> 
      ${updateButtonCompliled({
        id: topics.id,
      })} ${deleteButtonCompliled({
        id: topics.id,
      })}
  </td>`;
      return topics as TopicType;
    });

    const output = {
      draw: +draw,
      iTotalRecords: totalRecords,
      iTotalDisplayRecords: totalRecords,
      aaData: paginationDataArr,
    };

    return output;
  }

  async updateTopic(id: number, body: UpdateTopicDto) {
    await this.topicsRepository.update(id, body);
  }

  async deleteTopic(id: number) {
    await this.topicsRepository.delete(id);
  }

  async importTopic(params: CreateTopicInterface[]) {
    try {
      await this.topicsRepository.createBulkTopic(params);
    } catch (error) {
      console.log(error);
    }
  }

  createFilterQuery(filter: object) {
    const filterObject = {};
    Object.keys(filter).map((key) => {
      filterObject[key] = Like(`%${filter[key]}%`);
    });
    return filterObject;
  }
}
