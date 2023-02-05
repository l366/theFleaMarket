import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hashPassword } from 'src/common/utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly logger: Logger,
  ) {}
  async findOneByPhone(phone: string) {
    // 方法一：使用封装好的的方法
    const user = await this.userRepository.findOne({
      where: { phone },
      select: ['id', 'password', 'email', 'phone', 'state'],
    });

    // 方法二：使用 createQueryBuilder
    // const user = await this.userRepository
    //   .createQueryBuilder('user')
    //   .where('id= :id', { id })
    //   .getOne();
    this.logger.log({ user: user });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...data } = createUserDto;
      /* 加密密码 */
      const hashedPwd = await hashPassword(password);
      let user = new UserEntity();
      user = { ...createUserDto } as UserEntity;
      user.password = hashedPwd;
      /* 新增用户 */
      const result = await this.userRepository.save(user);

      if (result) {
        // this.logger.log(result);
        return result;
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
