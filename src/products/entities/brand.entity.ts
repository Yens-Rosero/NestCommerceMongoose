import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.entity';

export type BrandDocument = Brand & Document;

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Types.Array<Product>;

  @Prop()
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
