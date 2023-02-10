import { SetMetadata } from '@nestjs/common';

/* 保持原数据返回 */
export const KEEP_KEY = 'common:keep';

/* 开发接口无需登录，不进行 jwt 校验 */
export const IS_PUBLIC_KEY = 'isPublic';

/* 防止重复提交 */
export const REPEAT_SUBMIT_METADATA = 'common:repeatSubmit';
