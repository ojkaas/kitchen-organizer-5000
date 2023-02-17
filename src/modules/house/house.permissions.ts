import { InferSubjects } from '@casl/ability';
import { Actions, Permissions } from 'nest-casl';
import { Roles } from '../../core/authorisation/roles';
import { House } from './entities/house.entity';

export type Subjects = InferSubjects<typeof House>;

export const permissions: Permissions<Roles, Subjects, Actions> = {
    everyone({ cannot }) {
        //can(Actions.read, House);
        //cannot(Actions.manage, House);
    },

    customer({ user, can, cannot }) {
        can(Actions.read, House, { 'usersAsList.uuid': user.id }).because('You are not allowed to read!');
        can(Actions.update, House, { 'usersAsList.uuid': user.id }).because('You are not allowed to update');
    },
};