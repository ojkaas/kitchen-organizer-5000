import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Invite } from './submodules/entities/invite.entity';
import { House } from './entities/house.entity';
import { CaslModule } from 'nest-casl';
import { permissions } from './house.permissions';
import { StorageContainerModule } from '../storage-container/storage-container.module';

@Module({
  imports: [MikroOrmModule.forFeature([House]),
  MikroOrmModule.forFeature([Invite]),
  CaslModule.forFeature({ permissions }),
    StorageContainerModule],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [HouseService]
})
export class HouseModule { }
