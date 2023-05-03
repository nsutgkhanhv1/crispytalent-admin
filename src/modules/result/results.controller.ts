import 'reflect-metadata';
import {
  Get,
  Render,
  Controller,
  UseFilters,
  UseGuards,
  Res,
} from '@nestjs/common';
import { DataTableQuery } from '@shared/decorators/datatable_query.decorator';
import { AuthExceptionFilter } from '@shared/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from '@shared/guards/authenticated.guard';
import { ResultsService } from './results.service';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('results')
export class ResultsController {
  constructor(private readonly resultService: ResultsService) {}

  @Get('/')
  @Render('pages/results/index')
  async getResultsIndex() {
    return;
  }

  @Get('/datatable')
  async getResults(@DataTableQuery() query) {
    const results = await this.resultService.findAllResults(query);

    return results;
  }

  @Get('/export')
  async exportResults(@Res() res: any) {
    const path = await this.resultService.exportResult();
    return res.json({
      status: 'success',
      message: 'update success',
      data: path,
    });
  }
}
