import { SetMetadata } from '@nestjs/common';

/* 保持原数据返回 */
export const KEEP_KEY = 'common:keep';

/* 开发接口无需登录，不进行 jwt 校验 */
export const IS_PUBLIC_KEY = 'isPublic';

/* 编写 @Public() 装饰器 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
