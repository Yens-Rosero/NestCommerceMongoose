import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  AddProductsOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() changes: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, changes);
  }

  @Put(':id/products')
  addProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() products: AddProductsOrderDto,
  ) {
    return this.ordersService.addProducts(id, products.products);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
