import { PartialType } from '@nestjs/mapped-types';
import { HouseDto } from './house.dto';

export class UpdateHouseDto extends PartialType(HouseDto) { }
