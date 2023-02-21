import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "../../../core/entity/base.model";
import { User } from "../../user/user.entity";
import { Invite } from "../submodules/entities/invite.entity";

@ObjectType()
@Entity()
export class House extends BaseModel<House, 'uuid'> {
    @Field()
    @Property()
    name: string;

    @OneToMany(() => User, user => user.house, { eager: true, hidden: true })
    users = new Collection<User>(this);

    @OneToMany(() => Invite, invite => invite.house)
    invites = new Collection<Invite>(this);

    //Need to return a simple collection for permission checks
    @Property({ persist: false })
    get usersAsList() {
        if (this.users) {
            return this.users.getItems().map(user => ({ uuid: user.uuid }));
        } else {
            return [];
        }
    }

    //@OneToMany(() => PantryItem, pantryItem => pantryItem.house)
    //pantryItems = new Collection<PantryItem>(this);

    //@OneToMany(() => Invite, invite => invite.house)
    //invites = new Collection<Invite>(this);
}
