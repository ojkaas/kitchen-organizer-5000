import * as pactum from 'pactum';
import { newStorageContainer } from './data';
import { getAuthHeaders, getExistingUserAuthHeaders } from './helpers';

export function storageContainer() {
    describe('Add storage container', () => {
        it('should throw if not logged in', () => {
            return pactum
                .spec()
                .post('/storagecontainers')
                .withBody(newStorageContainer)
                .expectStatus(401);
        });
        it('should throw if no name is passed', () => {
            return pactum
                .spec()
                .post('/storagecontainers')
                .withHeaders(getAuthHeaders())
                .expectStatus(400);
        });
        it('should add storage container', () => {
            return pactum
                .spec()
                .post('/storagecontainers')
                .withHeaders(getAuthHeaders())
                .withBody(newStorageContainer)
                .expectStatus(201).stores('storageContainerUuid', 'uuid');
        });
    });
    describe('Get storage container', () => {
        it('should throw if not logged in', () => {
            return pactum
                .spec()
                .get('/storagecontainers/$S{storageContainerUuid}/')
                .expectStatus(401);
        });
        it('should throw if user is not part of storage container house', () => {
            return pactum
                .spec().withHeaders(getExistingUserAuthHeaders())
                .get('/storagecontainers/$S{storageContainerUuid}/')
                .expectStatus(403);
        });
        it('should retrieve storage container', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .get('/storagecontainers/$S{storageContainerUuid}/')
                .expectStatus(200);
        });
    });
    describe('Update storage container', () => {
        it('should throw with empty name', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .patch('/storagecontainers/$S{storageContainerUuid}/').withBody({ name: '' })
                .expectStatus(400);
        });
        it('should update with new name', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .patch('/storagecontainers/$S{storageContainerUuid}/').withBody({ name: 'ContainerA' })
                .expectStatus(200).expectJson('name', 'ContainerA');
        });
    });
    describe('Delete storage container', () => {
        it('should delete storage container', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .delete('/storagecontainers/$S{storageContainerUuid}/')
                .expectStatus(204);
        });
    });
}