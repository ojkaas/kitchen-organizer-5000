import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "src/core/entity/base.model";
import { PantryItem } from "src/modules/pantry-item/pantry-item.entity";
import { User } from "src/modules/user/user.entity";
import { Invite } from "../submodules/entities/invite.entity";

@ObjectType()
@Entity()
export class House extends BaseModel<House, 'uuid'> { 
    @Field()
    @Property()
    name: string;

    @OneToMany(() => User, user => user.house)
    users = new Collection<User>(this);

    @OneToMany(() => Invite, invite => invite.house)
    invites = new Collection<Invite>(this);

    //@OneToMany(() => PantryItem, pantryItem => pantryItem.house)
    //pantryItems = new Collection<PantryItem>(this);

    //@OneToMany(() => Invite, invite => invite.house)
    //invites = new Collection<Invite>(this);
}
