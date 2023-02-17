import { UuidType } from "@mikro-orm/core";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateStorageContainerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    house: UuidType;
}
