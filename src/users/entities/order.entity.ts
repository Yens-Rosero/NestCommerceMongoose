import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.entity';

import { Product } from './../../products/entities/product.entity';
import { Customer } from './customer.entity';

@Schema()
export class Order {
  @Prop({
    type: Date,
  })
  date: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Customer.name,
    required: true,
  })
  customer: Customer | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId}] , ref: Product.name })
  products:  Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
