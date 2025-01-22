import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    try {
      const filters: FilterQuery<Product> = {};
      const {
        limit = 10,
        offset = 0,
        minPrice,
        maxPrice,
        category,
        brand,
      } = params || ({} as FilterProductsDto);

      // Apply price filter
      if (minPrice !== undefined || maxPrice !== undefined) {
        filters.price = {};
        if (minPrice !== undefined) filters.price.$gte = minPrice;
        if (maxPrice !== undefined) filters.price.$lte = maxPrice;
      }

      // Apply category filter
      if (category) {
        filters.category = category;
      }

      // Apply brand filter
      if (brand) {
        filters.brand = brand;
      }

      const [products, total] = await Promise.all([
        this.productModel
          .find(filters)
          .populate(['brand', 'category'])
          .skip(offset)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec(),
        this.productModel.countDocuments(filters).exec(),
      ]);

      return {
        products,
        total,
      };
    } catch (error) {
      throw new BadRequestException('Error filtering products');
    }
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate(['brand', 'category'])
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    try {
      const newProduct = new this.productModel(data);
      return await newProduct.save();
    } catch (error) {
      throw new BadRequestException('Error creating product');
    }
  }

  async update(id: string, changes: UpdateProductDto) {
    try {
      const product = await this.productModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .populate(['brand', 'category'])
        .exec();
      if (!product) {
        throw new NotFoundException(`Product #${id} not found`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error updating product');
    }
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async findByCategory(categoryId: string) {
    return this.productModel
      .find({ category: categoryId })
      .populate(['brand', 'category'])
      .exec();
  }

  async findByBrand(brandId: string) {
    return this.productModel
      .find({ brand: brandId })
      .populate(['brand', 'category'])
      .exec();
  }
}
