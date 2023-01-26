import { IsEmail, IsNotEmpty, IsString, IsISO31661Alpha2, IsOptional } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsISO31661Alpha2()
    @IsOptional()
    language?: string;
}