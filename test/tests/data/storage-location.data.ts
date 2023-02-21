import { CreateStorageLocationDto } from "src/modules/storage-location/dto/create-storage-location.dto";
import { UpdateStorageLocationDto } from "../../../src/modules/storage-location/dto/update-storage-location.dto";

export const newStorageLocation: CreateStorageLocationDto = {
    name: 'Fridge',
    house: undefined
};

export const changeStorageLocation: UpdateStorageLocationDto = {
    name: 'Freezer'
};