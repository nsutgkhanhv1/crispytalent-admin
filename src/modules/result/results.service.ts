import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { ResultsRepository } from './results.repository';
import { ResultType } from './results.interface';
import * as fs from 'fs';
import { env } from '@env';
import { json2csv } from 'json-2-csv';
import * as path from 'path';

@Injectable()
export class ResultsService {
  constructor(private resultsRepository: ResultsRepository) {}

  findResultById(id: number) {
    return this.resultsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAllResults(query: any): Promise<any> {
    const { draw, start, length, order, filter } = query;
    const filterCondition = this.createFilterQuery(filter);

    const [allResults, totalRecords] =
      await this.resultsRepository.findAndCountResults({
        search: filterCondition,
        order: order,
        skip: start,
        take: length,
      });

    const paginationDataArrProcess = allResults.map(async (result) => {
      return result as ResultType;
    });

    const paginationDataArr = await Promise.all(paginationDataArrProcess);

    const output = {
      draw: +draw,
      iTotalRecords: totalRecords,
      iTotalDisplayRecords: totalRecords,
      aaData: paginationDataArr,
    };

    return output;
  }

  async exportResult() {
    const data = await this.resultsRepository.find();
    const randomName = Date.now() + '-result';

    const csvString = await json2csv(data);
    const dir = __dirname.split('\\');
    dir.splice(dir.length - 3, 3);

    return new Promise<any>((resolve, reject) => {
      fs.writeFile(
        `${dir.join('/')}/public/data_${randomName}.csv`,
        csvString,
        'utf-8',
        (err) => {
          if (err) reject(err);
          resolve(`${env.app.urlApi}/public/data_${randomName}.csv`);
        },
      );
    });
  }

  createFilterQuery(filter: object) {
    const filterObject = {};
    Object.keys(filter).map((key) => {
      filterObject[key] = Like(`%${filter[key]}%`);
    });
    return filterObject;
  }
}
