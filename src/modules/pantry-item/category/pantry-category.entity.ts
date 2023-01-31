import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../core/entity/base.model';
import { PantryItem } from '../pantry-item.entity';

@ObjectType()
@Entity()
export class PantryCategory extends BaseModel<PantryCategory, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @ManyToMany(() => PantryItem, pantryItem => pantryItem.categories)
    pantryItems = new Collection<PantryItem>(this);
}