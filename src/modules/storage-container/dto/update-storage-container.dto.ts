import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageContainerDto } from './create-storage-container.dto';

export class UpdateStorageContainerDto extends PartialType(CreateStorageContainerDto) {
    //TODO: Update DTO does not like this. Find out how to fix this.
    house: any;
}
