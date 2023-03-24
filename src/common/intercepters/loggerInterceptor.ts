import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const contentLength = res.get('content-length');
        const responseTime = Date.now() - now;
        Logger.log(
          `${method} ${url} statusCode:${statusCode} contentLength:${contentLength} - ${responseTime}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}
