import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    // Retrieve all brands with products
    return this.brandModel
      .find()
      .populate('products')
      .sort({ name: 1 }) // Sort by name ascending
      .exec();
  }

  async findOne(id: string) {
    // Find a brand by its ID with products
    const brand = await this.brandModel
      .findById(id)
      .populate('products')
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async findByName(name: string) {
    // Find brands by name (case-insensitive)
    return this.brandModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async create(data: CreateBrandDto) {
    // Check if brand with same name exists
    const existingBrand = await this.brandModel
      .findOne({ name: data.name })
      .exec();
    if (existingBrand) {
      throw new ConflictException(`Brand with name ${data.name} already exists`);
    }

    // Create a new brand
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    // Check if new name conflicts with existing brand
    if (changes.name) {
      const existingBrand = await this.brandModel
        .findOne({ name: changes.name, _id: { $ne: id } })
        .exec();
      if (existingBrand) {
        throw new ConflictException(`Brand with name ${changes.name} already exists`);
      }
    }

    // Update the brand
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async remove(id: string) {
    // Check if brand has associated products before deletion
    const brand = await this.brandModel
      .findById(id)
      .populate('products')
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    if (brand.products?.length > 0) {
      throw new ConflictException(
        `Cannot delete brand with ${brand.products.length} associated products`,
      );
    }

    return this.brandModel.findByIdAndDelete(id).exec();
  }
}
