import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { UserService } from "../user/user.service";
import { AuthDto } from "./dto";

@Injectable({})

export class AuthService {
    constructor(private userService: UserService, private jwt: JwtService, private config: ConfigService) { }

    async signin(dto: AuthDto) {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) throw new ForbiddenException('Credentials incorrect');
        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
        return this.signToken(user.uuid, user.email);
    }

    //@UseFilters(new UniqueConstraintFilter("User already exists"))
    async signup(dto: AuthDto) {
        const { email, password, name, language } = dto;
        const user = await this.userService.createUser(email, password, name, language);
        return this.signToken(user.uuid, user.email);
    }

    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, { expiresIn: '7d', secret: secret });
        return {
            access_token: token,
        }
    }
}