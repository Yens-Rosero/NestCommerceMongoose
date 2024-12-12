import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':productId') // :productId coincide con el decorador @Param
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.categoriesService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id,payload);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
