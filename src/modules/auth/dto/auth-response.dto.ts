import { AuthDto } from "./auth.dto";
import { Exclude } from 'class-transformer';
import { UuidType } from '@mikro-orm/core';
import { IsOptional } from "class-validator";

export class AuthResponseDto extends AuthDto {
    @Exclude()
    @IsOptional()
    password: string;

    house: UuidType
}