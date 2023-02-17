import { UuidType } from "@mikro-orm/core";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateStorageLocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    house: UuidType;
}
