import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(UniqueConstraintViolationException)
export class UniqueConstraintFilter extends BaseExceptionFilter {

    catch(exception: UniqueConstraintViolationException, host: ArgumentsHost) {
        super.catch(new ConflictException("Resource already exsists"), host);
    }
}