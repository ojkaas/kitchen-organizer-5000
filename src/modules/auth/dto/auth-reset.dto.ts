import { IsNotEmpty, IsString } from "class-validator";

export class AuthResetDto {
    @IsString()
    @IsNotEmpty()
    password: string;
}