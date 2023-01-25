import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/base.model';

@ObjectType()
@Entity()
export class Bin extends BaseModel<Bin, 'id'> {
    @Field()
    @Property()
    name!: string;


}