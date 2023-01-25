import { Entity, PrimaryKey, Property, BeforeUpdate, BeforeCreate } from '@mikro-orm/core';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import bcrypt from 'bcrypt';
import { BaseModel } from 'src/common/base.model';

@ObjectType()
@Entity()
export class User extends BaseModel<User, 'id'> {
    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    email!: string;

    @Field()
    @Property()
    language?: string;

    @Property()
    password!: string;


    @BeforeCreate()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}