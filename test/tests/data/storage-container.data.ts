import { CreateStorageContainerDto } from "../../../src/modules/storage-container/dto/create-storage-container.dto";
import { UpdateStorageContainerDto } from "../../../src/modules/storage-container/dto/update-storage-container.dto";

export const newStorageContainer: CreateStorageContainerDto = {
    name: 'SomeBox',
    house: undefined
};

export const changeStorageContainer: UpdateStorageContainerDto = {
    name: 'OtherBox',
    house: undefined
};