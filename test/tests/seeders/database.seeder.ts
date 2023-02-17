import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { House } from '../../../src/modules/house/entities/house.entity';
import { User } from '../../../src/modules/user/user.entity';
import { existingUserDto } from '../data';
import * as argon from "argon2";

export class DatabaseSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        // will get persisted automatically
        const house = em.create(House, {
            name: 'Default House'
        })

        let passwordHash = await argon.hash(existingUserDto.password);

        const user = em.create(User, {
            ...existingUserDto,
            "password": passwordHash,
            house
        });
    }
}