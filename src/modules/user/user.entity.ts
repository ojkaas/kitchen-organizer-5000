import { BeforeCreate, BeforeUpdate, Entity, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import * as argon from 'argon2';
import { BaseModel } from '../../core/entity/base.model';


@ObjectType()
@Entity()
export class User extends BaseModel<User, 'uuid'> {
    @Field()
    @Property()
    name?: string;

    @Field()
    @Property()
    @Unique()
    email!: string;

    @Field()
    @Property()
    language?: string = "EN";

    @Property()
    password!: string;


    @BeforeCreate()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await argon.hash(this.password);
    }
}