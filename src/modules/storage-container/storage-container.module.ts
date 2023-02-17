import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';
import { StorageLocationModule } from '../storage-location/storage-location.module';
import { StorageContainerController } from './storage-container.controller';
import { StorageContainer } from './storage-container.entity';
import { storagePermissions } from './storage-container.permissions';
import { StorageContainerResolver } from './storage-container.resolver';
import { StorageContainerService } from './storage-container.service';


@Module({
    imports: [MikroOrmModule.forFeature([StorageContainer]), CaslModule.forFeature({ permissions: storagePermissions }), StorageLocationModule],
    providers: [StorageContainerService, StorageContainerResolver],
    controllers: [StorageContainerController]
})
export class StorageContainerModule { }
