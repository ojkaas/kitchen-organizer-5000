
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStorageContainerDto } from './create-storage-container.dto';

export class UpdateStorageContainerDto extends PartialType(OmitType(CreateStorageContainerDto, ['house'] as const)) {
    
}
