import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import type { SubjectProxy } from 'nest-casl';

@Injectable()
export class UnwrapCaslSubjectPipe<T> implements PipeTransform<SubjectProxy<T>, Promise<T>> {
    async transform(subjectProxy: SubjectProxy<T>): Promise<T> {
        const subject = await subjectProxy.get();

        if (!subject) {
            throw new NotFoundException();
        }

        return subject;
    }
}