import { Entity, PrimaryKey, Property, BaseEntity } from '@mikro-orm/core';
import { Field, ID } from '@nestjs/graphql';

@Entity()
export abstract class BaseModel<T extends object, PK extends keyof T> extends BaseEntity<T, PK> {
    @Field(() => ID)
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    createdAt: Date = new Date();

    @Field()
    @Property({ onUpdate: () => { new Date(); } })
    updatedAt: Date = new Date();
}