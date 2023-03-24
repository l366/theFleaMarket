import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hashPassword } from 'src/common/utils/cryptogram';
import { User } from 'src/common/types/User/user.interface';

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

  async getUsers(
    options: FindManyOptions<UserEntity>,
  ): Promise<[UserEntity[], number]> {
    const [data, total] = await this.userRepository.findAndCount(options);
    return [data, total];
  }

  async getList() {
    try {
    } catch (err) {
      this.logger.error(err);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const { password, ...data } = createUserDto;
      const hashedPwd = await hashPassword(password);
      const user = this.userRepository.create({
        ...data,
        password: hashedPwd,
      });
      // 开启事务 使用 `this.userRepository.manager.transaction` 来处理事务
      return this.userRepository.manager.transaction(async (entityManager) => {
        try {
          const result = await entityManager.save(user);
          if (result) {
            return result;
          }
          throw new Error('Unable to save user to database');
        } catch (error) {
          // 在这里处理特定错误类型，例如记录错误信息或返回一个自定义错误
          if (error instanceof Error) {
            // 处理或记录自定义错误
            throw error;
          } else {
            // 处理或记录其他未知错误
            throw new Error('An unknown error occurred while saving the user');
          }
        }
      });
    } catch (error) {
      // 在这里处理错误，例如记录错误信息或返回一个自定义错误
      throw error;
    }
  }

  // async create(createUserDto: CreateUserDto) {
  //   try {
  //     const { password, ...data } = createUserDto;
  //     /* 加密密码 */
  //     const hashedPwd = await hashPassword(password);
  //     // let user = new UserEntity();
  //     // user = { ...createUserDto } as UserEntity;

  //     // user.password = hashedPwd;
  //     const user = this.userRepository.create({
  //       ...data,
  //       password: hashedPwd,
  //     });
  //     /* 新增用户 */
  //     const result = await this.userRepository.save(user);

  //     if (result) {
  //       // this.logger.log(result);
  //       return result;
  //     }

  //     return Promise.reject(new Error('Unable to save user to database'));
  //   } catch (err) {
  //     this.logger.error(err);
  //     return Promise.reject(err);
  //   }
  // }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = {
      ...foundUser,
      ...user,
    };
    const result = await this.userRepository.save(updatedUser);
    if (result) {
      return result;
    }
    return Promise.reject(new Error('Unable to update user in database'));
  }

  async remove(id: number): Promise<DeleteResult> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const result = await this.userRepository.delete(foundUser.id);
    return result;
  }
}
