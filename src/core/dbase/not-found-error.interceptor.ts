import { NotFoundError } from "@mikro-orm/core";
import { NotFoundException } from "@nestjs/common";
import { AbstractErrorInterceptor } from "./abstract-db-rethrow-exception.intereceptor";

export class NotFoundErrorFilter extends AbstractErrorInterceptor<NotFoundError> {
    interceptedType = NotFoundError;

    handleError(exception: NotFoundError) {
        throw new NotFoundException(exception.message);
    }
}