import { FilterQuery } from '@mikro-orm/core/typings';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: EntityRepository<User>) { }

    async findUserByEmail(email: string) {
        return this.findOne({ email: email });
    }

    async findUserByUUID(uuid: string) {
        return this.findOne(uuid);
    }

    findOne(query: FilterQuery<User>) {
        return this.userRepository.findOne(query);
    }

    async createUser(email: string, password: string, name?: string, language?: string): Promise<User> {
        const user = this.userRepository.create({
            name,
            email,
            language,
            password
        })
        await this.userRepository.persistAndFlush(user);
        return user;
    }
}
