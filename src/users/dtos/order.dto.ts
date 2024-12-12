import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsDate()
  @ApiProperty({ description: 'the date of the order' })
  readonly date: Date;

  @IsMongoId()
  @ApiProperty({ description: 'the customer of the order' })
  readonly customer: string;

  @IsArray()
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @ApiProperty({ description: 'the products of the order' })
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}
