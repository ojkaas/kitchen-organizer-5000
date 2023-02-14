import { UuidType } from "@mikro-orm/core";
import { IsEmail, IsNotEmpty, IsString, IsISO31661Alpha2, IsOptional, IsUUID } from "class-validator";

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

    @IsUUID()
    @IsOptional()
    houseReference?: UuidType;
}