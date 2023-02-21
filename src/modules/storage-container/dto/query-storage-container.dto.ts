import { PartialType } from "@nestjs/mapped-types";
import { CreateStorageContainerDto } from "./create-storage-container.dto";

export class QueryStorageContainerDto extends PartialType(CreateStorageContainerDto) {
    
}