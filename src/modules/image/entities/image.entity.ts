import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Product } from './product.entity';

import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  image_id: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  product: ProductEntity;

  @Column()
  image_url: string;
}
