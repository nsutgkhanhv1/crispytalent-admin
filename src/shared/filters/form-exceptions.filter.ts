import { Catch, ArgumentsHost } from '@nestjs/common';
import {
  I18nValidationException,
  I18nContext,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { formatI18nErrors } from 'nestjs-i18n/dist/utils/util';
import { Request, Response } from 'express';
import { formExceptionFormat } from '@utils/filters/form-exception-format';

@Catch(I18nValidationException)
export class FormExceptionFilter extends I18nValidationExceptionFilter {
  constructor() {
    super();
  }
  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const i18n = I18nContext.current();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errors = formatI18nErrors(exception.errors ?? [], i18n.service, {
      lang: i18n.lang,
    });

    if (exception instanceof I18nValidationException) {
      request.flash(
        'data',
        JSON.stringify(
          formExceptionFormat(
            request.body,
            this.normalizeValidationErrors(errors) as any[],
          ),
        ),
      );
      response.redirect('back');
    } else {
      response.redirect('/error');
    }
    return exception;
  }
}
