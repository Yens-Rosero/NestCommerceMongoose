import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  SetMetadata,
  // ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';
import { ProductsService } from './../services/products.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decoratorts/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Roles } from 'src/auth/decoratorts/roles.decorator';
import { Role } from 'src/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products with filters' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Public()
  @Get(':productId')
  @ApiOperation({ summary: 'Get a product by ID' })
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Public()
  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get products by category' })
  getByCategory(@Param('categoryId', MongoIdPipe) categoryId: string) {
    return this.productsService.findByCategory(categoryId);
  }

  @Public()
  @Get('brand/:brandId')
  @ApiOperation({ summary: 'Get products by brand' })
  getByBrand(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.productsService.findByBrand(brandId);
  }

  @Roles(Role.SELLER)
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Roles(Role.SELLER)
  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Roles(Role.SUPERVISOR)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
