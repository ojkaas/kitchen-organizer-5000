import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';
import { StorageContainer } from '../storage-container/storage-container.entity';
import { Product } from './product/product.entity';


@ObjectType()
@Entity()
export class PantryItem extends BaseModel<PantryItem, 'uuid'> {
    @ManyToOne({
        eager: true
    })
    product!: Product;

    @Field()
    @Property()
    expiryDate?: Date;

    @Field()
    @Property()
    quantity: number = 1;

    @ManyToOne({
        eager: true
    })
    storageContainer?: StorageContainer;
}