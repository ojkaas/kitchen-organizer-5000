import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { NotFoundError } from 'rxjs';
import { BaseUuidHook } from '../../../core/hooks/abstract-hook';
import { StorageLocation } from '../entities/storage-location.entity';
import { StorageLocationService } from '../storage-location.service';


@Injectable()
export class StorageLocationHook extends BaseUuidHook implements SubjectBeforeFilterHook<StorageLocation, Request> {
    constructor(readonly storageLocationService: StorageLocationService) { super() }

    async run({ params }: Request) {
        await this.validateUUID(params.uuid);
        try {
            return await this.storageLocationService.findOne({ uuid: params.uuid }, { populate: ['house'] as never });
        } catch (err) {
            if (err instanceof NotFoundError) throw new NotFoundException(err.message);
        }
    }
}