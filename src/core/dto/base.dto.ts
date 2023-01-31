import { IsDate, IsOptional, IsUUID } from "class-validator";

export abstract class BaseDto {
    @IsUUID()
    @IsOptional()
    uuid?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}