import { Type } from "class-transformer";
import { IsEAN, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { BaseDto } from "../../../core/dto/base.dto";
import { ProductCategoryDto } from "./product-category.dto";

export class ProductDto extends BaseDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEAN()
    @IsOptional()
    barCode?: string;

    @IsString()
    @IsOptional()
    cookingInstruction?: string;

    @IsOptional()
    @Type(() => ProductCategoryDto)
    @ValidateNested({ each:true })
    categories?: ProductCategoryDto[];

    @IsOptional()
    @IsNumber()
    storageContainer?: number;
}