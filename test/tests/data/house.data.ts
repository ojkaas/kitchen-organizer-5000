import { UpdateHouseDto } from "../../../src/modules/house/dto/update-house.dto";

export const changeHouse: UpdateHouseDto = {
    name: 'My Awesome House',
};

export const changeEmptyHouse: UpdateHouseDto = {
    name: '',
};