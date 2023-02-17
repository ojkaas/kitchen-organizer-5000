import { UuidType } from '@mikro-orm/core';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessGuard, Actions, CaslSubject, UseAbility } from 'nest-casl';
import { UnwrapCaslSubjectPipe } from '../../decorators/pipes/unwrap-casl-subject.pipe';

import { JwtGuard } from '../auth/guard';
import { HouseDto } from './dto/house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { House } from './entities/house.entity';
import { HouseHook } from './hook/house.hook';
import { HouseService } from './house.service';

@UseGuards(JwtGuard)
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) { }

  @Post()
  create(@Body() createHouseDto: HouseDto) {
    return this.houseService.insert(createHouseDto);
  }

  @Get(':uuid')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.read, House, HouseHook)
  async findOne(
    @CaslSubject(UnwrapCaslSubjectPipe) house: House) {
    return house;
  }

  @Patch(':uuid')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.update, House, HouseHook)
  async update(@Body() updateHouseDto: UpdateHouseDto,
    @CaslSubject(UnwrapCaslSubjectPipe) house: House) {
    return this.houseService.update((house), updateHouseDto);
  }

  @Post(':uuid/invite')
  @UseGuards(AccessGuard)
  @UseAbility(Actions.update, House, HouseHook)
  invite(@Param('uuid') houseId: UuidType, @Body('email') email: string) {
    return this.houseService.invite(houseId, email);
  }
}
