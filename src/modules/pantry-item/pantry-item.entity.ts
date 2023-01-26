import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';


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
    barCode!: Date;

    @Field()
    @Property()
    cookingInstruction!: string;
}