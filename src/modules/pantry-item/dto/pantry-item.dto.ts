import { Expose, Transform, Type } from "class-transformer";
import { IsDate, IsEAN, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateIf, ValidateNested } from "class-validator";
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
    @ValidateIf(o => typeof o.productReference === "undefined" && typeof o.product !== "undefined")
    @IsNotEmpty()
    @ValidateNested()
    product?: ProductDto;

    @ValidateIf(o => typeof o.product != 'object')
    @IsUUID()
    @IsNotEmpty()
    productReference?: string;
}