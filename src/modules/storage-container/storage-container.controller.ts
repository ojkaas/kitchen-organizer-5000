import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { HttpCode, Put, Query, UseInterceptors } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AccessGuard, Actions, CaslSubject, UseAbility } from 'nest-casl';
import { NotFoundErrorFilter } from '../../core/dbase/not-found-error.interceptor';
import { QueryBuilderHelper } from '../../core/dbase/query/query-builder.helper';
import { UUIDDto } from '../../core/dto/uuid.dto';
import { BodyWithUserHouse } from '../../decorators/controller/user-house-to-body.decorator';
import { UnwrapCaslSubjectPipe } from '../../decorators/pipes/unwrap-casl-subject.pipe';

import { GetUser } from '../auth/decorator';
import { AuthResponseDto } from '../auth/dto';
import { JwtGuard } from '../auth/guard';
import { CreateStorageContainerDto } from './dto/create-storage-container.dto';
import { QueryStorageContainerDto } from './dto/query-storage-container.dto';
import { UpdateStorageContainerDto } from './dto/update-storage-container.dto';
import { StorageContainerHook } from './hook/storage-container.hook';
import { StorageContainer } from './storage-container.entity';
import { StorageContainerService } from './storage-container.service';


@UseGuards(JwtGuard)
@Controller('storagecontainers')
export class StorageContainerController {
    constructor(private readonly storageContainerService: StorageContainerService, private qbHelper: QueryBuilderHelper) { }

    @Post()
    create(@BodyWithUserHouse(new ValidationPipe({
        whitelist: true,
        validateCustomDecorators: true
    }))
    createStorageContainerDto: CreateStorageContainerDto) {
        return this.storageContainerService.insert(createStorageContainerDto);
    }

    @Get()
    findAll(@GetUser() user: AuthResponseDto, @Query() dto: UpdateStorageContainerDto) {
        const dtoWithHousePredefined:QueryStorageContainerDto = {...dto, house: user.house}
        const query = this.qbHelper.convertDto(dtoWithHousePredefined);
        return this.storageContainerService.find(query);
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

    @Put(':uuid/location')
    @UseGuards(AccessGuard)
    @UseAbility(Actions.read, StorageContainer, StorageContainerHook)
    @UseInterceptors(NotFoundErrorFilter)
    async linkStorageLocation(
        @Body() storageLocationReference: UUIDDto,
        @CaslSubject(UnwrapCaslSubjectPipe) storageContainer: StorageContainer) {
        
        return this.storageContainerService.linkStorageLocation(storageContainer,storageLocationReference);
    }

    @Delete(':uuid/location')
    @UseGuards(AccessGuard)
    @UseAbility(Actions.read, StorageContainer, StorageContainerHook)
    async clearStorageLocation(@CaslSubject(UnwrapCaslSubjectPipe) storageContainer: StorageContainer) {
        return this.storageContainerService.clearStorageLocation(storageContainer);
    }
}
