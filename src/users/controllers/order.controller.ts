import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  AddProductsOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decoratorts/roles.decorator';
import { Role } from 'src/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  findAll() {
    return this.ordersService.findAll(); // Admin and Supervisor access
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id); // Admin and Supervisor access
  }

  @Roles(Role.CUSTOMER)
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data); // Customer access
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Put(':id')
  @ApiOperation({ summary: 'Update an order' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() changes: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, changes); // Admin and Supervisor access
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id); // Admin access
  }

  @Roles(Role.ADMIN)
  @Delete(':id/products/:productId')
  @ApiOperation({ summary: 'Remove a product from an order' })
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId); // Admin access
  }
}
