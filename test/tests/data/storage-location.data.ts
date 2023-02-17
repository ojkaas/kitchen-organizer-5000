import { UpdateStorageLocationDto } from "../../../src/modules/storage-location/dto/update-storage-location.dto";

export const newStorageLocation: UpdateStorageLocationDto = {
    name: 'Fridge',
    house: undefined
};

export const changeStorageLocation: UpdateStorageLocationDto = {
    name: 'Freezer',
    house: undefined
};