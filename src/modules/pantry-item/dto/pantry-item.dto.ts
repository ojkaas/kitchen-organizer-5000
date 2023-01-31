import { Expose, Transform, Type } from "class-transformer";
import { IsDate, IsEAN, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../../../core/dto/base.dto";
import { ProductDto } from "./product.dto";

export class PantryItemDto extends BaseDto {
    @IsDate()
    @IsOptional()
    expiryDate?: Date;

    @IsNumber()
    @IsOptional()
    quantity?: number;

    @Type(() => ProductDto)
    @IsOptional()
    product: ProductDto;
}