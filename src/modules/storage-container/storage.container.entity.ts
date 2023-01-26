import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../core/entity/base.model';



@ObjectType()
@Entity()
export class StorageContainer extends BaseModel<StorageContainer, 'uuid'> {
    @Field()
    @Property()
    name!: string;
}