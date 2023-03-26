import { TradeEntity } from './../../trade/entities/trade.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  evaluation_id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  evaluator: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.product_id, {
    nullable: true,
  })
  product: ProductEntity;

  @ManyToOne(() => TradeEntity, (trade) => trade.trade_id, { nullable: true })
  trade: TradeEntity;

  @Column()
  evaluation_target_type: string;

  @Column()
  evaluation_content: string;

  @Column()
  evaluation_rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  evaluation_time: Date;
}
