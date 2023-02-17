import { Entity, EnumArrayType, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Roles } from '../../core/authorisation/roles';
import { BaseModel } from '../../core/entity/base.model';
import { House } from '../house/entities/house.entity';

registerEnumType(Roles, {
    name: 'Roles',
});

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
    language?: string = "NL";

    @Property({ hidden: true })
    password!: string;

    @Property()
    lastLogin?: Date;

    @ManyToOne()
    house!: House;

    //For now default to single role used.
    @Field(type => [Roles])
    @Property({ type: EnumArrayType, nullable: true })
    roles: Roles[] = [Roles.customer];

    @Property({ persist: false })
    get id() {
        return `${this.uuid}`;
    }
}