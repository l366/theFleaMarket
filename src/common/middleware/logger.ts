import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, nest: NextFunction) {
    console.log(`Request ===> ${req.url}`);
    nest();
  }
}
