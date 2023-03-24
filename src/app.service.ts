import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
@Injectable()
export class AppService {
  /* constructor(@Inject('REDIS') private readonly client: Redis) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    return this.client.get(key);
  }
  getHello(): string {
    return 'Hello World!';
  } */
}

function Inject(
  arg0: string,
): (
  target: typeof AppService,
  propertyKey: undefined,
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
