import { UuidType } from "@mikro-orm/core";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UUIDDto {
    constructor(uuid: UuidType) {
        this.uuid = uuid;
    }

    @IsUUID()
    @IsNotEmpty()
    uuid!: UuidType;
}