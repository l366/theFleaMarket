import { IS_PUBLIC_KEY } from './../../../common/contants/decorator.comtants';
import { Observable } from 'rxjs';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
/* 只要是被 @Public() 修饰的，都不做验证，其它的都还是经过 super.canActivate(context) 的验证 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 用来过滤白名单，被@Public装饰器修饰的控制器直接跳过不做验证
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass,
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
