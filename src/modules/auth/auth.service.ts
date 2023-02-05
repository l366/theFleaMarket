import { UserService } from './../user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compareSync, hashPassword } from 'src/common/utils/cryptogram';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  /* 验证用户 */
  async validateUser(phone: string, password: string) {
    // const { password, phone } = body;
    const user = await this.userService.findOneByPhone(phone);
    if (user) {
      // 对比未加密数据与加密数据
      const match = await compareSync(password, user.password);

      if (match) {
        this.logger.log('用户名密码认证成功');
        const { password, ...result } = user;
        return user;
      }
      this.logger.error('密码错误');
    }
    this.logger.error('用户名密码认证失败');
    return null;
  }

  /* 创建 token */
  async createToken(user: any) {
    // this.logger.log(`PHONE:${user.phone}, PASSWORD:${user.password}`);
    const payload = { username: user.phone, password: user.password };
    return {
      code: 200,
      access_token: this.jwtService.sign(payload),
    };
  }
}
