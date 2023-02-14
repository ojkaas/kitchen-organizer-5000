import { UuidType } from "@mikro-orm/core";
import { IsDate, IsOptional, IsUUID } from "class-validator";

export abstract class BaseDto {
    @IsUUID()
    @IsOptional()
    uuid?: UuidType;
}