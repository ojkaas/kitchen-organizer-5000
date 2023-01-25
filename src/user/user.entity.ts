import { Entity, PrimaryKey, Property, BeforeUpdate, BeforeCreate } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import * as argon from 'argon2';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
@Entity()
export class User extends BaseModel<User, 'uuid'> {
    @Field()
    @Property()
    name?: string;

    @Field()
    @Property()
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