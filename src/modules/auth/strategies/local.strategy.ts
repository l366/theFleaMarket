import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

// name: 'local' 默认值，也可以自定义
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    // 官网写法
    // 这里默认不用配置，假设的是你的User实体中属性名为username和password
    // 如果不是的话，需要手动指定是usernameField:xx和passwordField:xxx
    super({
      usernameField: 'phone',
      passwordField: 'password',
      passReqToCallback: true, //设置回调函数 validate 第一个参数为 request
    });
  }

  // validate 是 localStrategy 的内置方法，当守卫被触发会自动调用
  async validate(req: Request, phone: string, password: string) {
    console.log(`手机号:${phone}, 密码：${password}`);
    const user = await this.authService.validateUser(phone, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.createToken(user);
  }
}
