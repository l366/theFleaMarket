/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   cryptogram.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: Ra1n <linzhenyu836@gmail.com>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/12/16 22:16:48 by Ra1n              #+#    #+#             */
/*   Updated: 2023/02/02 17:23:43 by Ra1n             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// import * as crypto from 'crypto';

// /*
//  * make salt
//  */
// export function makeSale(): string {
//   return crypto.randomBytes(3).toString('base64');
// }

// /*
//  * Encrypt password
//  * @param password 密码
//  * @param salt 密码盐
//  */

// export function encrytPassword(password: string, salt: string): string {
//   if (!password || !salt) {
//     return '';
//   }
//   const tempSalt = Buffer.from(salt, 'base64');
//   // 10000 代表迭代次数 16代表长度
//   return crypto
//     .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
//     .toString('base64');
// }
import * as bcrypt from 'bcrypt';

// 制作 salt
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// 加密
export async function hashPassword(myPlaintextPassword: string) {
  return await bcrypt.hashSync(myPlaintextPassword, salt);
}

// 解密
export async function compareSync(
  myPlaintextPassword: string, //用户输入进来的密码
  hashedPassword: string, //数据库的加密密码
) {
  console.log(`
  用户输入的密码:${myPlaintextPassword},
  数据库里的用户密码：${hashedPassword},`);
  return await bcrypt.compareSync(myPlaintextPassword, hashedPassword);
}
