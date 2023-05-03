import { Catch, ArgumentsHost } from '@nestjs/common';
import {
  I18nValidationException,
  I18nContext,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { formatI18nErrors } from 'nestjs-i18n/dist/utils/util';
import { Request, Response } from 'express';
import { formExceptionFormat } from '@utils/filters/form-exception-format';

@Catch()
export class ApiFormExceptionFilter extends I18nValidationExceptionFilter {
  constructor() {
    super();
  }
  catch(exception, host: ArgumentsHost) {
    const i18n = I18nContext.current();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const i18nErrors = formatI18nErrors(exception.errors ?? [], i18n.service, {
      lang: i18n.lang,
    });
    const errors = exception;
    if (exception instanceof I18nValidationException) {
      request.flash('data');
      response
        .status(400)
        .json(
          JSON.stringify(
            formExceptionFormat(
              request.body,
              this.normalizeValidationErrors(i18nErrors) as any[],
            ),
          ),
        );
    } else {
      response.status(500).json({
        status: 'error',
        message: 'Internal server errors',
      });
    }
    return exception;
  }
}
