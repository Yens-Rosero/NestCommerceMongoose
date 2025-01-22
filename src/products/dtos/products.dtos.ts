import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Min,
  IsOptional,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dtos';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly category: CreateCategoryDto;

  @IsMongoId()
  @IsNotEmpty()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}


export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;

  @IsOptional()
  @IsMongoId()
  readonly category: string;

  @IsOptional()
  @IsMongoId()
  readonly brand: string;
}
