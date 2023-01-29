import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';
import { PantryItem } from '../pantry-item/pantry-item.entity';



@ObjectType()
@Entity()
export class StorageContainer extends BaseModel<StorageContainer, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    location: string;

    @OneToMany(() => PantryItem, pantryItem => pantryItem.storageContainer)
    pantryItems = new Collection<PantryItem>(this);
}