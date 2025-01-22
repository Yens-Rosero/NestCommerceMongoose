import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    // Retrieve all categories with products
    return this.categoryModel
      .find()
      .populate('products')
      .sort({ name: 1 }) // Sort by name ascending
      .exec();
  }

  async findOne(id: string) {
    // Find a category by its ID with products
    const category = await this.categoryModel
      .findById(id)
      .populate('products')
      .exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async findByName(name: string) {
    // Find categories by name (case-insensitive)
    return this.categoryModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
  }

  async create(data: CreateCategoryDto) {
    // Check if category with same name exists
    const existingCategory = await this.categoryModel
      .findOne({ name: data.name })
      .exec();
    if (existingCategory) {
      throw new ConflictException(`Category with name ${data.name} already exists`);
    }

    // Create a new category
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  async update(id: string, changes: UpdateCategoryDto) {
    // Check if new name conflicts with existing category
    if (changes.name) {
      const existingCategory = await this.categoryModel
        .findOne({ name: changes.name, _id: { $ne: id } })
        .exec();
      if (existingCategory) {
        throw new ConflictException(`Category with name ${changes.name} already exists`);
      }
    }

    // Update the category
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async remove(id: string) {
    // Check if category has associated products before deletion
    const category = await this.categoryModel
      .findById(id)
      .populate('products')
      .exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    if (category.products?.length > 0) {
      throw new ConflictException(
        `Cannot delete category with ${category.products.length} associated products`,
      );
    }

    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
