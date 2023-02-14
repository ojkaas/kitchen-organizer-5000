import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/core/dto/base.dto";

export class CreateHouseDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
}
