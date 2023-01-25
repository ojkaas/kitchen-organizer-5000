import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { StorageContainer } from './storage.container.entity';


@Injectable()
export class StorageContainerService {
    constructor(
        @InjectRepository(StorageContainer) private scRepository: EntityRepository<StorageContainer>) { }

    async createStorageContainer(name): Promise<StorageContainer> {
        const bin = this.scRepository.create({
            name
        })
        this.scRepository.persistAndFlush(bin);
        return bin;
    }
}
