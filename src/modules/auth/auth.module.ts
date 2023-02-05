import { UserService } from './../user/user.service';
import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LoggerSevice } from 'src/common/utils/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';

@Module({
  imports: [
    // 导入 User 实体
    TypeOrmModule.forFeature([UserEntity]),
    // 设置 jwt 相关信息
    JwtModule.register({
      secret: `LinZhenYu is the best`,
      signOptions: {
        expiresIn: `1d`,
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, Logger, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
