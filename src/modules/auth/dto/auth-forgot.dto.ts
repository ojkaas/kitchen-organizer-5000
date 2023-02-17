import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthForgotDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}