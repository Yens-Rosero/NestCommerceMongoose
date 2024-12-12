import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }

      return this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = this.productModel.findById(id).populate('brand').exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, changes: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async remove(id: string) {
    try {
      return await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new NotFoundException(`Product #${id} not found`);
    }
  }
}
