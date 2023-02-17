import { InferSubjects } from '@casl/ability';
import { Actions, Permissions } from 'nest-casl';
import { Roles } from '../../core/authorisation/roles';
import { StorageContainer } from './storage-container.entity';

export type Subjects = InferSubjects<typeof StorageContainer>;

export const storagePermissions: Permissions<Roles, Subjects, Actions> = {
    everyone({ can }) {
        //
    },

    customer({ user, can, }) {
        can(Actions.manage, StorageContainer, { 'house.usersAsList.uuid': user.id }).because('You are not allowed to read!');
    },
};