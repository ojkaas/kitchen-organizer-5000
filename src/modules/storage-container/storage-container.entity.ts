import { Collection, Entity, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';
import { House } from '../house/entities/house.entity';
import { PantryItem } from '../pantry-item/pantry-item.entity';
import { StorageLocation } from '../storage-location/entities/storage-location.entity';



@ObjectType()
@Entity()
export class
    StorageContainer extends BaseModel<StorageContainer, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @ManyToOne()
    location?: StorageLocation;

    @ManyToOne()
    house!: House;

    @OneToMany(() => PantryItem, pantryItem => pantryItem.storageContainer)
    pantryItems = new Collection<PantryItem>(this);
}