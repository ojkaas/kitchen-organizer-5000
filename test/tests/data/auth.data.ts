import { AuthDto } from "../../../src/modules/auth/dto";
import { AuthResetDto } from "../../../src/modules/auth/dto/auth-reset.dto";

export const newUserDto: AuthDto = {
    email: 'test@test.com',
    password: '12356',
};

export const existingUserDto: AuthDto = {
    name: 'John Snow',
    email: 'john@wall.st',
    password: '12356',
};

export const resetPwDto: AuthResetDto = {
    password: '123567',
};