import { InferSubjects } from '@casl/ability';
import { Actions, Permissions } from 'nest-casl';
import { Roles } from '../../core/authorisation/roles';
import { StorageLocation } from './entities/storage-location.entity';

export type Subjects = InferSubjects<typeof StorageLocation>;

export const locationPermissions: Permissions<Roles, Subjects, Actions> = {
    everyone({ can }) {
        //
    },

    customer({ user, can, }) {
        can(Actions.manage, StorageLocation, { 'house.usersAsList.uuid': user.id }).because('You are not allowed to read!');
    },
};