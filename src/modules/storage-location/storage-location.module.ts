import { Module } from '@nestjs/common';
import { StorageLocationService } from './storage-location.service';
import { StorageLocationController } from './storage-location.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StorageLocation } from './entities/storage-location.entity';
import { CaslModule } from 'nest-casl';
import { locationPermissions } from './storage-location.permissions';
import { QueryBuilderHelper } from '../../core/dbase/query/query-builder.helper';

@Module({
  imports: [MikroOrmModule.forFeature([StorageLocation]), CaslModule.forFeature({ permissions: locationPermissions })],
  controllers: [StorageLocationController],
  providers: [StorageLocationService, QueryBuilderHelper],
  exports: [StorageLocationService]
})
export class StorageLocationModule { }
