import * as pactum from 'pactum';

export function user() {
    pactum.spec().withHeaders({
        Authorization: 'Bearer $S{existingUserAt}',
    }).get('/users/me').stores('otherHouseUuid', 'house');

    describe('Get me', () => {
        it('should not have access to user', () => {
            return pactum.spec().get('/users/me').expectStatus(401);
        })
        it('should get current user', () => {
            return pactum.spec().withHeaders({
                Authorization: 'Bearer $S{userAt}',
            }).get('/users/me').expectStatus(200).stores('houseUuid', 'house');
        });
    });
}