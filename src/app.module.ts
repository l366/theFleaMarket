import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

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
      password: '40a693f17afaea8a', // 密码
      database: 'thefleamarket', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      synchronize: false, // synchronize 表示数据库的结构是否和代码保持同步 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),

    /* 子模块 */
    UserModule,
    AuthModule,
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
export class AppModule {}
