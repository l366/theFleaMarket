import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('二手交易平台')
    .setDescription('Api文档')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setLicense('MIT', 'https://www.baidu.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`doc`, app, document);
}
