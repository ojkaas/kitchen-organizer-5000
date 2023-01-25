import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService {
    constructor(private userService: UserService) { }

    signin() {
        return { msg: 'Signing in' }
    }

    async signup(dto: AuthDto) {
        const { email, password, name, language } = dto;
        const user = await this.userService.createUser(email, password, name, language);
        return user;
    }
}