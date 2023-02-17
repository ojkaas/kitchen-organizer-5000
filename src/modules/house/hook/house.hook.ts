import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { NotFoundError } from 'rxjs';
import { BaseUuidHook } from '../../../core/hooks/abstract-hook';
import { House } from '../entities/house.entity';
import { HouseService } from '../house.service';


@Injectable()
export class HouseHook extends BaseUuidHook implements SubjectBeforeFilterHook<House, Request> {
    constructor(readonly houseService: HouseService) { super() }

    async run({ params }: Request) {
        await this.validateUUID(params.uuid);
        try {
            return await this.houseService.findOne({ uuid: params.uuid });
        } catch (err) {
            if (err instanceof NotFoundError) throw new NotFoundException(err.message);
        }
    }
}