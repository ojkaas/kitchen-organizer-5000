import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UUIDDto } from 'src/core/dto/uuid.dto';
import { BaseCrudService } from '../../core/service/base.service';
import { StorageLocationService } from '../storage-location/storage-location.service';
import { StorageContainer } from './storage-container.entity';


@Injectable()
export class StorageContainerService extends BaseCrudService<StorageContainer> {
    constructor(
        @InjectRepository(StorageContainer) private storageContainerRepository: EntityRepository<StorageContainer>, private storageLocationService: StorageLocationService) {
        super(storageContainerRepository);
    }

    async linkStorageLocation(storageContainer: StorageContainer, storageLocationReference: UUIDDto) {
        const storageLocation = await this.storageLocationService.findOne({ uuid: storageLocationReference.uuid }, { populate: ['house'] as never })        
        if(storageLocation.house.uuid !== storageContainer.house.uuid) throw new UnauthorizedException("Not allowed to link storage location");
        
        storageContainer.location = storageLocation; 
        this.storageContainerRepository.flush();
        return storageContainer;
    }

    async clearStorageLocation(storageContainer: StorageContainer) {
        storageContainer.location = null;
        this.storageContainerRepository.flush();
        return storageContainer;
    }
}
