// import { User } from './../../modules/user/entities/user.entity';

type TUser<T> = {
  code: number;
  count: number;
  data: Array<T>;
};
export { TUser };
