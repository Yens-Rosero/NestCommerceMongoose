import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from 'src/auth/decoratorts/roles.decorator';
import { Role } from 'src/models/roles.model';
import { payloadToken } from 'src/models/token.model';
import { OrdersService } from '../services/orders.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  @ApiOperation({ summary: 'Get orders for the logged-in customer' })
  getOrders(@Req() req: Request) {
    const user = req.user as payloadToken;
    return this.orderService.ordersByCustomer(user.sub.toString());
  }
}
