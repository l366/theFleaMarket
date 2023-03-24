import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { UserEntity } from './entities/user.entity';
import { User } from '../../common/types/User/user.interface';
import { FindManyOptions, Like } from 'typeorm';
import { LoggingInterceptor } from 'src/common/intercepters/loggerInterceptor';
@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /* 分页查询用户列表 */
  // page：当前页数，默认为 1。
  // limit：每页限制数，默认为 10。
  // sortBy：排序字段，默认为 id。
  // sortOrder：排序方式，可以是 ASC 或 DESC，默认为 ASC。
  // search：搜索关键字，默认为空字符串。
  @Get()
  async getUsers(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query('search') search = '',
  ) {
    // console.log(query, 'query');
    /* const users: any = await this.userService.getList();
    if (users) {
      res.status(HttpStatus.OK).json({ code: 200, data: users });
    } */
    const options: FindManyOptions<UserEntity> = {
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: sortOrder },
      where: search ? { name: Like(`%${search}%`) } : {},
    };

    const [data, total] = await this.userService.getUsers(options);
    res.status(200).json({ data, total });
    // return { data, total };
  }
  //   // return this.userService.findAll();
  // }
  // getUsers(page: number, pageSize: number): User[] {
  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
  //   return this.users.slice(startIndex, endIndex);
  // }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.userService.findOne(+id);
    if (result) {
      res.status(200).json({ result });
    }
  }

  @Patch(':id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = this.userService.update(+id, updateUserDto);
    if (result) {
      res.status(200).json({
        result,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
