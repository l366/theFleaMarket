import { Contains, IsDate, IsEmail } from 'class-validator';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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

  @CreateDateColumn({ name: 'create_time', nullable: true })
  create_time: Date;

  @UpdateDateColumn({ name: 'update_time', nullable: true })
  update_time: Date | null;

  @OneToMany(() => ProductEntity, (product) => product.seller)
  products: ProductEntity[];
}
