import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseModel } from '../../../../core/entity/base.model';
import { House } from '../../entities/house.entity';

@Entity()
export class Invite extends BaseModel<Invite, 'uuid'> {
  @Property()
  email!: string;

  @Property()
  accepted: boolean;

  @ManyToOne()
  house!: House;
}