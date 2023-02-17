import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../../core/service/base.service';
import { StorageContainer } from './storage-container.entity';


@Injectable()
export class StorageContainerService extends BaseCrudService<StorageContainer> {
    constructor(
        @InjectRepository(StorageContainer) private scRepository: EntityRepository<StorageContainer>) {
        super(scRepository);
    }
}
