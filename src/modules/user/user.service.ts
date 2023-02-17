import { UniqueConstraintViolationException, UuidType } from '@mikro-orm/core';
import { FilterQuery } from '@mikro-orm/core/typings';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../../core/service/base.service';
import { House } from '../house/entities/house.entity';
import { HouseService } from '../house/house.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseCrudService<User> {
    constructor(
        @InjectRepository(User) private userRepository: EntityRepository<User>, private houseService: HouseService) {
        super(userRepository);
    }

    async findUserByUUID(uuid: UuidType) {
        return await this.findOne(uuid);
    }

    async createUser(email: string, password: string, name?: string, language?: string, houseReference?: UuidType): Promise<User> {
        let house: House;
        if (houseReference) {
            house = await this.houseService.findOne({ uuid: houseReference });
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
