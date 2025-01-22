import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Types.Array<Product>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
