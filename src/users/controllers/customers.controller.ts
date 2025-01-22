import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from 'src/auth/decoratorts/roles.decorator';
import { Role } from 'src/models/roles.model';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List all customers' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of customers' })
  findAll() {
    return this.customersService.findAll(); // Admin and Supervisor access
  }

  @Roles(Role.ADMIN, Role.SUPERVISOR)
  @Get(':id')
  @ApiOperation({ summary: 'Get a customer by ID' })
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.findOne(id); // Admin and Supervisor access
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer' })
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload); // Public access
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload); // Admin access
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.customersService.remove(id); // Admin access
  }
}
