import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseDto } from "../../../core/dto/base.dto";

export class ProductCategoryDto extends BaseDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}