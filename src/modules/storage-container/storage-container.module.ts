import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { StorageContainer } from './storage-container.entity';
import { StorageContainerResolver } from './storage-container.resolver';
import { StorageContainerService } from './storage-container.service';


@Module({
    imports: [MikroOrmModule.forFeature([StorageContainer])],
    providers: [StorageContainerService, StorageContainerResolver]
})
export class StorageContainerModule { }
