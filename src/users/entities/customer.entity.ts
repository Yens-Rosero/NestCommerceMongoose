import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Customer {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
