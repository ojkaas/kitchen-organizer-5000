import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signin() {
        return { msg: 'Signing in' }
    }

    signup() {
        return { msg: 'Signing up' }
    }
}