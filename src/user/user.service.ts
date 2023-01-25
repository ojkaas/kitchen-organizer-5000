import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: EntityRepository<User>) { }

    async createUser(name, email, language): Promise<User> {
        const user = this.userRepository.create({
            name,
            email,
            language,
        })
        this.userRepository.persistAndFlush(user);
        return user;
    }
}
