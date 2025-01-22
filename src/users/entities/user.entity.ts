import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

@Schema()
export class User {
  @Prop()
  email: string;

  @ExcludeProperty()
  @Prop()
  password: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
