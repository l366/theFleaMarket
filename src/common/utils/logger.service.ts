// logger.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerSevice {
  log(message: string) {
    console.log(`[${new Date().toISOString()} ${message}]`);
  }
}
