import * as pactum from 'pactum';
import { changeEmptyHouse, changeHouse, existingUserDto } from './data';
import { getAuthHeaders, getExistingUserAuthHeaders } from './helpers';

export function house() {
    describe('Get house', () => {
        it('anonymous user should not have access to house', () => {
            return pactum.spec().get('/house/$S{houseUuid}/').expectStatus(401);
        })
        it('user should not have access to other users house', async () => {
            await pactum.spec().withHeaders(getExistingUserAuthHeaders())
                .get('/users/me').expectStatus(200).stores('otherHouseUuid', 'house');

            return pactum.spec().withHeaders(getAuthHeaders())
                .get('/house/$S{otherHouseUuid}/').expectStatus(403);
        })
        it('should get current users house', () => {
            return pactum.spec().withHeaders(getAuthHeaders())
                .get('/house/$S{houseUuid}/').expectStatus(200);
        });
    });
    describe('Update house', () => {
        it('should throw if house name is empty', () => {
            return pactum.spec().withHeaders(getAuthHeaders())
                .patch('/house/$S{houseUuid}/').withBody(changeEmptyHouse).expectStatus(400);
        });
        it('should update current users house', () => {
            return pactum.spec().withHeaders(getAuthHeaders())
                .patch('/house/$S{houseUuid}/').withBody(changeHouse).expectStatus(200).expectJson('name', changeHouse.name);
        });
    });
}