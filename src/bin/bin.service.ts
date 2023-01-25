import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Bin } from './bin.entity';


@Injectable()
export class BinService {
    constructor(
        @InjectRepository(Bin) private binRepository: EntityRepository<Bin>) { }

    async createBin(name): Promise<Bin> {
        const bin = this.binRepository.create({
            name
        })
        this.binRepository.persistAndFlush(bin);
        return bin;
    }
}
