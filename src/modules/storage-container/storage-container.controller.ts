import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { HttpCode, Put } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AccessGuard, AccessService, Actions, CaslSubject, SubjectProxy, UseAbility } from 'nest-casl';
import { UUIDDto } from '../../core/dto/uuid.dto';
import { BodyWithUserHouse } from '../../decorators/controller/user-house-to-body.decorator';
import { UnwrapCaslSubjectPipe } from '../../decorators/pipes/unwrap-casl-subject.pipe';

import { GetUser } from '../auth/decorator';
import { AuthResponseDto } from '../auth/dto';
import { AuthContextDto } from '../auth/dto/auth-context.dto';
import { JwtGuard } from '../auth/guard';
import { StorageLocation } from '../storage-location/entities/storage-location.entity';
import { StorageLocationHook } from '../storage-location/hook/storage-location.hook';
import { StorageLocationService } from '../storage-location/storage-location.service';
import { CreateStorageContainerDto } from './dto/create-storage-container.dto';
import { UpdateStorageContainerDto } from './dto/update-storage-container.dto';
import { StorageContainerHook } from './hook/storage-container.hook';
import { StorageContainer } from './storage-container.entity';
import { StorageContainerService } from './storage-container.service';


@UseGuards(JwtGuard)
@Controller('storagecontainers')
export class StorageContainerController {
    constructor(private readonly storageContainerService: StorageContainerService, private accessService: AccessService, private storageLocationSerivce: StorageLocationService) { }

    @Post()
    create(@BodyWithUserHouse(new ValidationPipe({
        whitelist: true,
        validateCustomDecorators: true
    }))
    createStorageContainerDto: CreateStorageContainerDto) {
        return this.storageContainerService.insert(createStorageContainerDto);
    }

    @Post(':uuid/location')
    @UseGuards(AccessGuard)
    @UseAbility(Actions.read, StorageContainer, StorageContainerHook)
    async findAll(@GetUser() user: AuthContextDto,
        @Body() storageLocationReference: UUIDDto,
        @CaslSubject(UnwrapCaslSubjectPipe) storageContainer: StorageContainer) {
        const storageLocation = await this.storageLocationSerivce.findOne({ uuid: storageLocationReference.uuid }, { populate: ['house'] as never })
        const check = this.accessService.hasAbility(user, Actions.read, storageLocation);
        console.log("CHECK: " + check);
        //return this.storageContainerService.linkLocation(storageContainer, storageLocation);
    }

    @Get(':uuid')
    @UseGuards(AccessGuard)
    @UseAbility(Actions.read, StorageContainer, StorageContainerHook)
    async findOne(
        @CaslSubject(UnwrapCaslSubjectPipe) storageContainer: StorageContainer) {
        return storageContainer;
    }

    @Patch(':uuid')
    @UseGuards(AccessGuard)
    @UseAbility(Actions.update, StorageContainer, StorageContainerHook)
    async update(@Body() updateStorageContainerDto: UpdateStorageContainerDto,
        @CaslSubject(UnwrapCaslSubjectPipe) storageContainer: StorageContainer) {
        return this.storageContainerService.update(storageContainer, updateStorageContainerDto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AccessGuard)
    @UseAbility(Actions.delete, StorageContainer, StorageContainerHook)
    async remove(@CaslSubject(UnwrapCaslSubjectPipe) storageContainer: StorageContainer) {
        return this.storageContainerService.deleteByEntity(storageContainer);
    }
}
