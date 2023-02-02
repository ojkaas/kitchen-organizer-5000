import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, Observable } from "rxjs";

export abstract class AbstractErrorInterceptor<T> implements NestInterceptor {
    protected interceptedType: new (...args) => T;

    intercept(
        context: ExecutionContext,
        call$: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return call$.handle().pipe(
            catchError(exception => {
                if (exception instanceof this.interceptedType) {
                    this.handleError(exception);
                }
                throw exception;
            }),
        );
    }

    abstract handleError(exception: T);
}