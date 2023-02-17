import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AccessGuard, Actions, CaslSubject, SubjectProxy, UseAbility } from 'nest-casl';
import { BodyWithUserHouse } from '../../decorators/controller/user-house-to-body.decorator';
import { UnwrapCaslSubjectPipe } from '../../decorators/pipes/unwrap-casl-subject.pipe';

import { GetUser } from '../auth/decorator';
import { AuthResponseDto } from '../auth/dto';
import { JwtGuard } from '../auth/guard';
import { CreateStorageLocationDto } from './dto/create-storage-location.dto';
import { UpdateStorageLocationDto } from './dto/update-storage-location.dto';
import { StorageLocation } from './entities/storage-location.entity';
import { StorageLocationHook } from './hook/storage-location.hook';
import { StorageLocationService } from './storage-location.service';

@UseGuards(JwtGuard)
@Controller('storagelocations')
export class StorageLocationController {
  constructor(private readonly storageLocationService: StorageLocationService) { }

  @Post()
  create(@BodyWithUserHouse(new ValidationPipe({
    whitelist: true,
    validateCustomDecorators: true
  }))
  createStorageLocationDto: CreateStorageLocationDto) {
    return this.storageLocationService.insert(createStorageLocationDto);
  }

  @Get()
  findAll(@GetUser() user: AuthResponseDto) {
    return this.storageLocationService.findAll({ house: user.house });
  }

  @Get(':uuid')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.read, StorageLocation, StorageLocationHook)
  async findOne(
    @CaslSubject(UnwrapCaslSubjectPipe) storageLocation: StorageLocation) {
    return storageLocation;
  }

  @Patch(':uuid')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.update, StorageLocation, StorageLocationHook)
  async update(@Body() updateStorageLocationDto: UpdateStorageLocationDto,
    @CaslSubject(UnwrapCaslSubjectPipe) storageLocation: StorageLocation) {
    return this.storageLocationService.update(storageLocation, updateStorageLocationDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessGuard)
  @UseAbility(Actions.delete, StorageLocation, StorageLocationHook)
  async remove(@CaslSubject(UnwrapCaslSubjectPipe) storageLocation: StorageLocation) {
    return this.storageLocationService.deleteByEntity(storageLocation);
  }
}
