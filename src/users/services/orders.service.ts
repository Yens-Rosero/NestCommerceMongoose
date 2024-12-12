import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from '../entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AddProductsOrderDto, CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return this.orderModel.find().populate(['customer','products']).exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async removeProduct(id: string, productId: string) {
    return this.orderModel
      .findByIdAndUpdate(id, { $pull: { products: productId } }, { new: true })
      .exec();
  }

  async addProducts(id: string, productsIds: string[]) {
    return this.orderModel
      .findByIdAndUpdate(id, { $push: { products: { $each: productsIds } } }, { new: true })
      .exec();
  }
}
