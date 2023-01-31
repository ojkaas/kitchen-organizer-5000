import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { ConflictException, HttpException } from '@nestjs/common';


// To prevent doing try/catching of common exceptions everytime in the service layer that should be handled by the controller this decorator is used.
export function catchHttpExceptionsOnClass() {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                const methods = Object.getOwnPropertyNames(constructor.prototype)
                    .filter(name => name !== 'constructor');
                methods.forEach(method => {
                    const originalMethod = this[method];
                    this[method] = function (...args: any[]) {
                        try {
                            return originalMethod.apply(this, args);
                        } catch (error) {
                            if (error instanceof HttpException) {
                                throw error;
                            } 
                            if ( error instanceof UniqueConstraintViolationException) {
                                throw new ConflictException("Resource already exsists");
                            }
                        }
                    }
                });
            }
        }
    }
}