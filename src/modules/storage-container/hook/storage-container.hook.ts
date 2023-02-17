import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { NotFoundError } from 'rxjs';
import { BaseUuidHook } from '../../../core/hooks/abstract-hook';
import { StorageContainer } from '../storage-container.entity';
import { StorageContainerService } from '../storage-container.service';

@Injectable()
export class StorageContainerHook extends BaseUuidHook implements SubjectBeforeFilterHook<StorageContainer, Request> {
    constructor(readonly storageContainerService: StorageContainerService) { super() }

    async run({ params }: Request) {
        await this.validateUUID(params.uuid);
        try {

            return await this.storageContainerService.findOne({ uuid: params.uuid }, { populate: ['house'] as never });
        } catch (err) {
            if (err instanceof NotFoundError) throw new NotFoundException(err.message);
        }
    }
}