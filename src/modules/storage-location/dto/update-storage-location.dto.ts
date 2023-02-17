import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreateStorageLocationDto } from './create-storage-location.dto';

export class UpdateStorageLocationDto extends PartialType(CreateStorageLocationDto) {
    //TODO: Update DTO does not like this. Find out how to fix this.
    house: any;
}
