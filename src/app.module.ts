import { LoggerMiddleware } from './common/middleware/logger';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';
import { RedisModule } from 'nestjs-redis';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    /* 设置env 文件 */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    /* 数据库模块 */
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '39.108.60.144', // 数据库ip地址
      port: 3306, // 端口
      username: 'root', // 登录名
      password: 'Lzy6658975..!', // 密码
      database: 'thefleamarket', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      synchronize: false, // synchronize 表示数据库的结构是否和代码保持同步 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),
    /* redis 模块 */
    /* RedisModule.register({
      host: '39.108.60.144', // Redis 服务器地址
      port: 6379, // Redis 服务器端口
      password: 'Lzy6658975..!', // Redis 认证密码，如果没有则不需要设置
      db: 0, // Redis 数据库编号，如果没有则不需要设置
    }), */

    /* 子模块 */
    UserModule,
    AuthModule,
    ProductModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
