import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "src/core/dto/base.dto";

export class CreateInviteDto extends BaseDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}