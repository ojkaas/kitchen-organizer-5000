import { UuidType } from '@mikro-orm/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { Request, SubjectBeforeFilterHook } from 'nest-casl';
import { UUIDDto } from '../dto/uuid.dto';



@Injectable()
export abstract class BaseUuidHook {
    async validateUUID(uuid: UuidType) {
        const dto = new UUIDDto(uuid);

        const validationErrors = await validate(dto);
        if (validationErrors.length > 0) {
            throw new BadRequestException(validationErrors);
        }

    }
}