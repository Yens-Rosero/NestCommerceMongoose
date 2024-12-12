import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from './entities/user.entity';
import { OrderController } from './controllers/order.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
  ],
  controllers: [CustomerController, UsersController, OrderController],
  providers: [CustomersService, UsersService, OrdersService],
})
export class UsersModule {}
