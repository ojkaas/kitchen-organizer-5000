import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';
import { StorageContainer } from '../storage-container/storage-container.entity';
import { PantryCategory } from './category/pantry-category.entity';


@ObjectType()
@Entity()
export class PantryItem extends BaseModel<PantryItem, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    expiryDate!: Date;

    @Field()
    @Property()
    quantity: number = 1;

    @Field()
    @Property()
    barCode!: Date;

    @Field()
    @Property()
    cookingInstruction!: string;

    @ManyToMany()
    categories = new Collection<PantryCategory>(this);

    @ManyToOne()
    storageContainer?: StorageContainer;
}