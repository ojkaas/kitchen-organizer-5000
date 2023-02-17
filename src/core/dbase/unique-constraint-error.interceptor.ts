import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { ConflictException } from "@nestjs/common";
import { AbstractErrorInterceptor } from "./abstract-db-rethrow-exception.intereceptor";

export class UniqueConstraintErrorFilter extends AbstractErrorInterceptor<UniqueConstraintViolationException> {
    interceptedType = UniqueConstraintViolationException;

    handleError(exception: UniqueConstraintViolationException) {
        throw new ConflictException("Resource already exists");
    }
}