import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TradeEntity {
  @PrimaryGeneratedColumn()
  trade_id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  buyer: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  seller: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  product: ProductEntity;

  @Column()
  trade_status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trade_price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  trade_time: Date;
}
