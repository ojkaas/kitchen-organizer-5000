import { IsDate, IsEAN, IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../../../core/dto/base.dto";

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

    categories?= [];

    @IsOptional()
    @IsNumber()
    storageContainer?: number;
}