import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../../core/dto/base.dto";

export class HouseDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
}
