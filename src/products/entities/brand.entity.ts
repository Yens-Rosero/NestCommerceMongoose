import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
