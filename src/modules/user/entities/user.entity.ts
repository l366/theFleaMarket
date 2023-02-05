import { Contains, IsDate, IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Generated,
} from 'typeorm';

/* 表名为 user  */
@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, name: 'name', length: '20' })
  name: string;

  @Column({ type: 'varchar', name: 'phone' })
  phone: string;

  @Column({ type: 'varchar', name: 'password', length: '250', select: false })
  password: string;

  @Column({ unique: true, type: 'varchar', name: 'email', length: '20' })
  @IsEmail()
  email: string;

  @Column({ type: 'tinyint', name: 'state' })
  @Contains('1')
  state: string;

  @Column({ type: 'int', name: 'age' })
  age: number;

  @Column({ type: 'varchar', name: 'gender', length: '255' })
  gender: string;

  @Column({ type: 'varchar', name: 'avatar', length: '255' })
  avatar?: string;

  @Column({ type: 'timestamp', name: 'create_time' })
  @IsDate()
  create_time?: Date;

  @Column({ type: 'timestamp', name: 'update_time' })
  @IsDate()
  update_time?: Date;
}
