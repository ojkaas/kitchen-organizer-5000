import { Collection, Entity, Index, ManyToMany, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../../core/entity/base.model';
import { ProductCategory } from '../category/product-category.entity';


@ObjectType()
@Entity()
export class Product extends BaseModel<Product, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @Field()
    @Unique()
    @Index()
    @Property()
    barCode!: string;

    @Field()
    @Property()
    cookingInstruction?: string;

    @ManyToMany({ eager: true })
    categories = new Collection<ProductCategory>(this);

    constructor(name: string, barCode: string, cookingInstruction?: string) {
        super();
        this.name = name;
        this.barCode = barCode;
        if(cookingInstruction) {
            this.cookingInstruction = cookingInstruction;
        }
      }
}