import { Collection, Entity, ManyToMany, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../core/entity/base.model';
import { PantryCategory } from '../category/pantry-category.entity';


@ObjectType()
@Entity()
export class Product extends BaseModel<Product, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @Field()
    @Unique()
    @Property()
    barCode?: string;

    @Field()
    @Property()
    cookingInstruction?: string;

    @ManyToMany()
    categories = new Collection<PantryCategory>(this);
}