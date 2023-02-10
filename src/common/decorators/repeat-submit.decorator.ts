import { SetMetadata } from '@nestjs/common';
import { REPEAT_SUBMIT_METADATA } from '../contants/decorator.comtants';

export class RepeatSubmitOption {
  interval?: number = 5; // 默认5秒一次请求
  message?: string = '请求过于频繁';
}

export const RepeatSubmit = (option?: RepeatSubmitOption) => {
  const repeatSubmitOption = Object.assign(new RepeatSubmitOption(), option);
  return SetMetadata(REPEAT_SUBMIT_METADATA, repeatSubmitOption);
};
