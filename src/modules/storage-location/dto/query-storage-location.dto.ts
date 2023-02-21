import { PartialType } from "@nestjs/mapped-types";
import { CreateStorageLocationDto } from "./create-storage-location.dto";

export class QueryStorageLocationDto extends PartialType(CreateStorageLocationDto) {
    
}