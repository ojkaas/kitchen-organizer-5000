import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../../core/service/base.service';
import { StorageLocation } from './entities/storage-location.entity';

@Injectable()
export class StorageLocationService extends BaseCrudService<StorageLocation> {

  constructor(@InjectRepository(StorageLocation)
  private readonly storageLocationRepository: EntityRepository<StorageLocation>) {
    super(storageLocationRepository);
  }
}
