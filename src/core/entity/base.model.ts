import { PrimaryKey, Property, BaseEntity, UuidType } from '@mikro-orm/core';
import { Field, ID } from '@nestjs/graphql';
import { v4 } from 'uuid';


export abstract class BaseModel<T extends object, PK extends keyof T> extends BaseEntity<T, PK> {
    @Field(() => ID)
    @PrimaryKey({ columnType: 'uuid', defaultRaw: 'gen_random_uuid()' })
    uuid:UuidType;

    @Field()
    @Property({defaultRaw: 'now()'})
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => { new Date();}, defaultRaw: 'now()' })
    updatedAt: Date = new Date();
}