import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/swagger/setup-swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*配置 允许跨域 */
  app.enableCors();

  // setupSwagger(app);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('port'));

  // console.log(`Application is running on: ${await app.getUrl()}`);
  return configService;
  /* 打印swagger地址 */
  // console.log('http://127.0.0.1:3000/doc/');
}

bootstrap().then((configService) => {
  console.log(
    `🤩 应用程序接口地址： http://localhost:${configService.get<number>(
      'port',
    )}`,
  );
  console.log('🚀 服务应用已经成功启动！');
});
