import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  MinLength,
  MaxLength,
  IsDecimal,
} from 'class-validator';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  seller_id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  product_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  status: string;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  category: CategoryEntity;
}
