import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;
    return newUser.save();
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    try {
      const result = await this.userModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async getOrderByUser(id: string) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
