import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Roles } from 'src/auth/decoratorts/roles.decorator';
import { Role } from 'src/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decoratorts/public.decorator';

@ApiTags('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Roles(Role.SELLER)
  @Get('search')
  @ApiOperation({ summary: 'Search categories by name' })
  searchByName(@Query('name') name: string) {
    return this.categoriesService.findByName(name);
  }

  @Public()
  @Get(':categoryId')
  @ApiOperation({ summary: 'Get a category by ID' })
  getOne(@Param('categoryId', MongoIdPipe) categoryId: string) {
    return this.categoriesService.findOne(categoryId);
  }

  @Roles(Role.SUPERVISOR)
  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Roles(Role.SUPERVISOR)
  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
