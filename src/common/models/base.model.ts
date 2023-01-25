import { PrimaryKey, Property, BaseEntity } from '@mikro-orm/core';
import { Field, ID } from '@nestjs/graphql';
import { v4 } from 'uuid';


export abstract class BaseModel<T extends object, PK extends keyof T> extends BaseEntity<T, PK> {
    @Field(() => ID)
    @PrimaryKey()
    uuid = v4();

    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => { new Date(); } })
    updatedAt: Date = new Date();
}