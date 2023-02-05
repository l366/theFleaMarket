/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   public.decorator.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Ra1n <linzhenyu836@gmail.com>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/17 13:59:40 by Ra1n              #+#    #+#             */
/*   Updated: 2022/12/17 14:01:32 by Ra1n             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../contants/decorator.comtants';

/* 自定义Public装饰器   */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
