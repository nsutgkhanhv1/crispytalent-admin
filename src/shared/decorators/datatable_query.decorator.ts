import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { DataTableQueryInterface } from '../interfaces/datatable_query.interface';

export const DataTableQuery = createParamDecorator(
  (data, ctx: ExecutionContext): DataTableQueryInterface => {
    const req: Request = ctx.switchToHttp().getRequest();
    const queryParams: DataTableQueryInterface = {
      draw: 0,
      start: 0,
      length: 10,
      order: {},
      search: '',
    };

    const { draw, start, length, order, columns, search, filter } = req.query;
    queryParams.draw = draw ? parseInt(draw.toString()) : 0;
    queryParams.start = start ? parseInt(start.toString()) : 0;
    queryParams.length = length ? parseInt(length.toString()) : 10;

    let column_name = 'id';
    let column_sort_order = 'asc';
    if (order) {
      const column_index = order[0]['column'];
      column_name = columns[column_index]['data'];
      column_sort_order = order[0]['dir'];
    }
    queryParams.order = { [column_name]: column_sort_order };
    queryParams.search = search['value'] as string;
    queryParams.columns = columns;
    queryParams.filter = filter;

    return queryParams;
  },
);
