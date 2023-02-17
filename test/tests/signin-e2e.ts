import * as pactum from 'pactum';
import { existingUserDto, newUserDto } from './data/auth.data';

export function signin() {
    it('should throw if email empty', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
                password: newUserDto.password,
            })
            .expectStatus(400);
    });
    it('should throw if password empty', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .withBody({
                email: newUserDto.email,
            })
            .expectStatus(400);
    });
    it('should throw if no body provided', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .expectStatus(400);
    });
    it('should signin', () => {
        return pactum
            .spec()
            .post('/auth/signin')
            .withBody(newUserDto)
            .expectStatus(200)
            .stores('userAt', 'access_token');
    });
}