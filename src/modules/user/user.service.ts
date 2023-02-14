import { UuidType } from '@mikro-orm/core';
import { FilterQuery } from '@mikro-orm/core/typings';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { House } from '../house/entities/house.entity';
import { HouseService } from '../house/house.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: EntityRepository<User>, private houseService:HouseService) { }

    async findUserByEmail(email: string) {
        return this.findOne({ email: email });
    }

    async findUserByUUID(uuid: UuidType) {
        return this.findOne(uuid);
    }

    findOne(query: FilterQuery<User>) {
        return this.userRepository.findOne(query);
    }

    async createUser(email: string, password: string, name?: string, language?: string, houseReference?: UuidType): Promise<User> {
        let house : House;
        if(houseReference) {
            house = await this.houseService.findOne({uuid: houseReference});
        } else {
            house = this.houseService.createDefault();
        }

        const user = this.userRepository.create({
            name,
            email,
            language,
            password,
            house
        })
        await this.userRepository.persistAndFlush(user);
        return user;
    }
}
