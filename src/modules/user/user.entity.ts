import { BeforeCreate, BeforeUpdate, Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import * as argon from 'argon2';
import { BaseModel } from '../../core/entity/base.model';
import { House } from '../house/entities/house.entity';

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

    @Property({ hidden: true })
    password!: string;

    @ManyToOne({eager: true})
    house!: House;

    @BeforeCreate()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await argon.hash(this.password);
    }
}