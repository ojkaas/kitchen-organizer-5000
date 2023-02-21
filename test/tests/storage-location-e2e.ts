import * as pactum from 'pactum';
import { newStorageLocation } from './data';
import { getAuthHeaders, getExistingUserAuthHeaders } from './helpers';

export function storageLocation() {
    describe('Add storage location', () => {
        it('should throw if not logged in', () => {
            return pactum
                .spec()
                .post('/storagelocations')
                .withBody(newStorageLocation)
                .expectStatus(401);
        });
        it('should throw if no name is passed', () => {
            return pactum
                .spec()
                .post('/storagelocations')
                .withHeaders(getAuthHeaders())
                .expectStatus(400);
        });
        it('should add storage location', () => {
            return pactum
                .spec()
                .post('/storagelocations')
                .withHeaders(getAuthHeaders())
                .withBody(newStorageLocation)
                .expectStatus(201).stores('storageLocationUuid', 'uuid');
        });
    });
    describe('Get storage location', () => {
        it('should throw if not logged in', () => {
            return pactum
                .spec()
                .get('/storagelocations/$S{storageLocationUuid}/')
                .expectStatus(401);
        });
        it('should throw if user is not part of storage location house', () => {
            return pactum
                .spec().withHeaders(getExistingUserAuthHeaders())
                .get('/storagelocations/$S{storageLocationUuid}/')
                .expectStatus(403);
        });
        it('should retrieve storage location', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .get('/storagelocations/$S{storageLocationUuid}/')
                .expectStatus(200);
        });
        it('should retrieve all storage locations of user', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .get('/storagelocations/')
                .expectStatus(200).expectJsonLength(1);
        });
        it('should retrieve all storage locations of user based on query', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .get('/storagelocations/?name=idge')
                .expectStatus(200).expectJsonLength(1);
        });
        it('should retrieve no storage locations of user based on no result query', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .get('/storagelocations/?name=Bla')
                .expectStatus(200).expectJsonLength(0);
        });
        
    });
    describe('Update storage location', () => {
        it('should throw with empty name', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .patch('/storagelocations/$S{storageLocationUuid}/').withBody({ name: '' })
                .expectStatus(400);
        });
        it('should update with new name', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .patch('/storagelocations/$S{storageLocationUuid}/').withBody({ name: 'FreezyFreeze' })
                .expectStatus(200).expectJson('name', 'FreezyFreeze');
        });
    });
    describe('Delete storage location', () => {
        it('should delete storage location', () => {
            return pactum
                .spec().withHeaders(getAuthHeaders())
                .delete('/storagelocations/$S{storageLocationUuid}/')
                .expectStatus(204);
        });
    });
}