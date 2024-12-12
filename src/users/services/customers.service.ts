import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerMode: Model<Customer>   ) {}

  findAll() {
    return this.customerMode.find().exec();
  }

  findOne(id: string) {
    const customer = this.customerMode.findById(id).exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = new this.customerMode(data);
    return newCustomer.save();
  }

  update(id: string, changes: UpdateCustomerDto) {
    const customer = this.customerMode
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  remove(id: string) {
    try {
      const result = this.customerMode.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
  }
}
