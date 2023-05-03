import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export const getTemplate = (hsbPath: string) => {
  const pathName = hsbPath.split('/');
  const template: string = fs.readFileSync(
    path.join(__dirname, '..', '..', 'views', ...pathName),
    'utf8',
  );
  return Handlebars.compile(template);
};
