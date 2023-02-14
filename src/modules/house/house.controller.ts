import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { UuidType } from '@mikro-orm/core';
import { instanceToPlain } from 'class-transformer';
import { MergedUUIDParamAndBody } from 'src/decorators/controller/uuid-param-and-body.decorator';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.insert(createHouseDto);
  }

  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(+id);
  }

  @Patch(':id')
  update(@MergedUUIDParamAndBody() updateHouseDto: UpdateHouseDto) {
    console.log(instanceToPlain(updateHouseDto));
    //return this.houseService.updateOrInsert(updateHouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UuidType) {
    return this.houseService.delete(+id);
  }

  @Post(':id/invite')
  invite(@Param('id') houseId: UuidType, @Body('email') email: string) {
    return this.houseService.invite(houseId, email);
  }
}
