import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* 
@Injectable()
export class ProductService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
} */
// product.service.ts
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(productDto: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.product_name = productDto.product_name;
    product.description = productDto.description;
    product.price = productDto.price;
    product.status = productDto.status;
    product.category = productDto.category;
    product.seller.id = productDto.seller_id;
    return this.productRepository.save(productDto);
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  /* async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy(id, {
      relations: ['seller', 'category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    return product;
  }
 */
  /*  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    product.product_name =
      updateProductDto.product_name ?? product.product_name;
    product.description = updateProductDto.description ?? product.description;
    product.price = updateProductDto.price ?? product.price;
    product.status = updateProductDto.status ?? product.status;
    product.category = updateProductDto.category ?? product.category;
    product.seller = updateProductDto.seller ?? product.seller;
    product.updated_at = new Date();

    return this.productRepository.save(product);
  } */

  /* async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }

    await this.productRepository.remove(product);
  } */

  /* async createWithTransaction(
    productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productRepository.manager.transaction(async (manager) => {
      const product = new ProductEntity();
      product.product_name = productDto.product_name;
      product.description = productDto.description;
      product.price = productDto.price;
      product.status = productDto.status;
      product.category = productDto.category;
      product.seller = productDto.seller;
      product.created_at = new Date();
      product.updated_at = new Date();

      return manager.save(product);
    });
  }
 */
  /* async updateWithTransaction(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productRepository.manager.transaction(async (manager) => {
      const product = await manager.findOne(ProductEntity, id);
      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found.`);
      }

      product.product_name =
        updateProductDto.product_name ?? product.product_name;
      product.description = updateProductDto.description ?? product.description;
      product.price = updateProductDto.price ?? product.price;
      product.status = updateProductDto.status ?? product.status;
      product.category = updateProductDto.category ?? product.category;
      product.seller = updateProductDto.seller ?? product.seller;
      product.updated_at = new Date();

      return manager.save(product);
    });
  } */
}
