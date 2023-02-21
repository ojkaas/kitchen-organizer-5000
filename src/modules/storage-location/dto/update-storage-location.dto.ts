
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStorageLocationDto } from './create-storage-location.dto';

export class UpdateStorageLocationDto extends PartialType(OmitType(CreateStorageLocationDto, ['house'] as const)) {
    
}
