import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id: number;

  @ManyToOne(() => UserEntity, (user) => user.products)
  seller: UserEntity;

  @Column()
  product_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  status: string;

  @ManyToOne(() => CategoryEntity, (category) => category.category_id)
  category: CategoryEntity;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime' })
  updated_at: Date;
}
