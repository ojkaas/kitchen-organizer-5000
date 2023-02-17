import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../../../core/dto/base.dto";


export class CreateInviteDto extends BaseDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;
}