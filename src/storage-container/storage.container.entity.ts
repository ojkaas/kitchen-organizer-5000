import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';


@ObjectType()
@Entity()
export class StorageContainer extends BaseModel<StorageContainer, 'uuid'> {
    @Field()
    @Property()
    name!: string;
}