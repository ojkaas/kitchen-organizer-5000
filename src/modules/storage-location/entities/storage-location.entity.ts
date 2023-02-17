import { Entity, Property, Unique, ManyToOne } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "../../../core/entity/base.model";
import { House } from "../../house/entities/house.entity";

@ObjectType()
@Entity()
@Unique({ properties: ['name', 'house'] })
export class StorageLocation extends BaseModel<StorageLocation, 'uuid'> {
    @Field()
    @Property()
    name!: string;

    @ManyToOne()
    house!: House;
}
