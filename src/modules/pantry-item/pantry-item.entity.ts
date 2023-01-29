import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';
import { StorageContainer } from '../storage-container/storage-container.entity';


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

    @Field()
    @Property()
    category?: string;

    @ManyToOne()
    storageContainer?: StorageContainer;
}