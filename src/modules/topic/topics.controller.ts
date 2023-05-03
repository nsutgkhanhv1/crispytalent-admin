import 'reflect-metadata';
import {
  Get,
  Render,
  Controller,
  Res,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import 'reflect-metadata';
import { UpdateTopicDto } from './topics.dto';
import { Response } from 'express';
import { DataTableQuery } from '@shared/decorators/datatable_query.decorator';
import { ApiFormExceptionFilter } from '@shared/filters/api.form-exceptions.filter';
import { AuthExceptionFilter } from '@shared/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileEnum } from '@common/enum/file.enum';
import { createFileUploadOption } from '@common/lib/file';
import { File } from '@interfaces/file.interface';
import csvJSON from '@utils/csvtojson';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get('/')
  @Render('pages/topics/index')
  async getTopicsIndex() {
    return;
  }

  @Get('/modal-update/:id')
  @Render('pages/topics/popup/edit')
  async getUpdateModal(@Param('id', ParseIntPipe) id: number) {
    const topic = await this.topicsService.findTopicById(id);
    return { layout: false, topic: topic };
  }

  @Get('/modal-delete/:id')
  @Render('pages/topic/popup/delete')
  getDeleteModal(@Param('id', ParseIntPipe) id: number) {
    return { layout: false, topic: { id: id } };
  }

  @Get('/datatable')
  async getTopics(@DataTableQuery() query) {
    const topics = await this.topicsService.findAllTopics(query);

    return topics;
  }

  @Post('/import')
  @UseInterceptors(
    FilesInterceptor(
      'files',
      FileEnum.MAX_QTY_CSV,
      createFileUploadOption(
        'application/vnd.ms-excel',
        FileEnum.MAX_SIZE_CSV,
        FileEnum.MAX_QTY_CSV,
      ),
    ),
  )
  async importTopics(
    @UploadedFiles()
    files: Array<File>,
    @Res() res: Response,
  ) {
    const topicData = JSON.parse(
      csvJSON(files[0].buffer.toString().replace(/[\r\n]/gm, '/l')),
    );
    await this.topicsService.importTopic(topicData);
    return res.json({
      status: 'success',
      message: 'update success',
    });
  }

  @Post('/update/:id')
  @UseFilters(ApiFormExceptionFilter)
  async updateTopicById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTopicDto: UpdateTopicDto,
    @Res() res: Response,
  ) {
    await this.topicsService.updateTopic(id, updateTopicDto);
    return res.json({
      status: 'success',
      message: 'update success',
    });
  }

  @Post('/delete/:id')
  @UseFilters(ApiFormExceptionFilter)
  async deleteTopicById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.topicsService.deleteTopic(id);
    return res.json({
      status: 'success',
      message: 'delete success',
    });
  }
}
