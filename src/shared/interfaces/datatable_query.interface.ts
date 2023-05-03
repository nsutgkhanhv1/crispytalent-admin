export interface DataTableQueryInterface {
  draw?: number;
  start?: number;
  length?: number;
  order?: object;
  search?: string;
  columns?: any;
  filter?: any;
}
