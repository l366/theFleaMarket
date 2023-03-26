import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  category_name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.category_id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_category_id' })
  parent_category: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent_category)
  sub_categories: CategoryEntity[];
}
