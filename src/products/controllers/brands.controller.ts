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

import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { Roles } from 'src/auth/decoratorts/roles.decorator';
import { Role } from 'src/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decoratorts/public.decorator';

@ApiTags('brands')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Roles(Role.SELLER)
  @Get('search')
  @ApiOperation({ summary: 'Search brands by name' })
  searchByName(@Query('name') name: string) {
    return this.brandsService.findByName(name);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by ID' })
  get(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  @Roles(Role.SUPERVISOR)
  @Post()
  @ApiOperation({ summary: 'Create a new brand' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Roles(Role.SUPERVISOR)
  @Put(':id')
  @ApiOperation({ summary: 'Update a brand' })
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand' })
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.brandsService.remove(id);
  }
}
