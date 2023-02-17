import * as pactum from 'pactum';
import { newUserDto } from './data/auth.data';

export function signup() {
    it('should throw if email empty', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
                password: newUserDto.password,
            })
            .expectStatus(400);
    });
    it('should throw if password empty', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .withBody({
                email: newUserDto.email,
            })
            .expectStatus(400);
    });
    it('should throw if no body provided', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .expectStatus(400);
    });
    it('should signup', () => {
        return pactum
            .spec()
            .post('/auth/signup')
            .withBody(newUserDto)
            .expectStatus(201);
    });
}
