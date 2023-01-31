import { Collection, Entity, ManyToMany, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../core/entity/base.model';
import { Product } from '../product/product.entity';

@ObjectType()
@Entity()
export class PantryCategory extends BaseModel<PantryCategory, 'uuid'> {
    @Field()
    @Unique()
    @Property()
    name!: string;

    @ManyToMany(() => Product, product => product.categories)
    pantryItems = new Collection<Product>(this);
}