import * as pactum from 'pactum';
import { existingUserDto, resetPwDto } from './data/auth.data';
import { MailhogClientService } from './helpers/mail-client';
import * as cheerio from 'cheerio';

export function lostpw() {
    let ident: string;
    let token: string;
    describe('Request password reset', () => {
        it('should receive email when calling forgot email', async () => {
            let mailHog = MailhogClientService.getInstance().getMailhog();
            await mailHog.clearInbox(existingUserDto.email);

            await pactum
                .spec()
                .post('/auth/forgot')
                .withBody({
                    email: existingUserDto.email,
                })
                .expectStatus(201);

            const email = await mailHog.getLastEmail({
                to: existingUserDto.email
            });
            expect(email).toBeTruthy();
            const $ = cheerio.load(email.html);
            const resetLink = $('#reset-link').attr('href');
            [ident, token] = resetLink.match(/\/([^/]+)\/([^/]+)\/?$/).slice(1, 3);
        });
    });
    describe('Password reset', () => {
        it('should throw when token is not valid', async () => {
            await pactum
                .spec()
                .get(`/auth/reset/${ident}/some-bogustoken`).expectStatus(400);
        });
        it('should return valid when checking reset url', async () => {
            await pactum
                .spec()
                .get(`/auth/reset/${ident}/${token}`).expectStatus(204);
        });
        it('should throw when resetting without new pw', async () => {
            await pactum
                .spec()
                .post(`/auth/reset/${ident}/${token}`).expectStatus(400);
        });
        it('should throw when resetting with blank pw', async () => {
            await pactum
                .spec()
                .post(`/auth/reset/${ident}/${token}`).withBody({ "password": "" }).expectStatus(400);
        });
        it('should update pw and return token when resetting', async () => {
            await pactum
                .spec()
                .post(`/auth/reset/${ident}/${token}`).withBody(resetPwDto)
                .expectStatus(201).expectJsonLike({ "access_token": "typeof $V === 'string'" })
                .stores('existingUserAt', 'access_token');
        });
    });
}