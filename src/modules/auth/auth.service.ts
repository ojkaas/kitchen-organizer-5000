import { NotFoundError, UuidType } from "@mikro-orm/core";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { createHash } from "crypto";
import { DateTime } from "luxon";
import { MailService } from "../mail/mail.service";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { AuthDto } from "./dto";
import { AuthForgotDto } from "./dto/auth-forgot.dto";

export interface ResetResponse {
    valid: boolean;
    msg?: string;
    user?: User;
    token?: {
        access_token: string;
    }
}

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwt: JwtService, private config: ConfigService, private mailService: MailService) { }

    async signin(dto: AuthDto) {
        try {
            const user = await this.userService.findOne({ email: dto.email });
            const pwMatches = await argon.verify(user.password, dto.password);
            if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
            user.lastLogin = new Date();
            this.userService.flush();
            return this.signToken(user);
        } catch (e) {
            if (e instanceof NotFoundError) throw new ForbiddenException('Credentials incorrect');
            throw e;
        }
    }


    async signup(dto: AuthDto) {
        const { email, password, name, language, houseReference } = dto;
        const passwordHash = await this.hashPassword(password);
        const user = await this.userService.createUser(email, passwordHash, name, language, houseReference);
        return this.signToken(user);
    }

    async signToken(user: User): Promise<{ access_token: string }> {
        const payload = {
            sub: user.uuid,
            email: user.email
        }

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, { expiresIn: '7d', secret: secret });
        return {
            access_token: token,
        }
    }

    private base64Encode(data: string) {
        return Buffer.from(data).toString('base64');
    }

    private base64Decode(data: string) {
        return Buffer.from(data, 'base64').toString('utf-8')
    }

    private generateResetHash(user: User, today?: string) {
        const lastLogin = (user.lastLogin) ? user.lastLogin.toISOString() : "never"

        const data = {
            today: today,
            user: user.uuid,
            lastLogin: lastLogin,
            password: user.password
        }

        return createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }

    private hashPassword(password: string) {
        return argon.hash(password);
    }

    async forgot(dto: AuthForgotDto) {
        const user = await this.userService.findOne({ email: dto.email });
        const today = DateTime.now().toString();
        const todayEncoded = this.base64Encode(today);
        const hash = this.generateResetHash(user, today);
        const ident = this.base64Encode(dto.email.toString());

        const token = todayEncoded + '-' + hash;
        await this.mailService.sendPasswordReset(user, ident, token);
        return { "token": token };
    }

    //TODO: Streamline the error handling, to much repeat code.
    async validateReset(ident: string, today: string, hash: string): Promise<ResetResponse> {
        const tday = this.base64Decode(today);

        if (!DateTime.fromISO(tday).isValid) {
            return { valid: false, msg: "Link is invalid, please try to reset your password again." };
        }
        const then = DateTime.fromISO(tday);
        const now = DateTime.now();
        const timeSince = now.diff(then).hours;
        if (timeSince > 3) {
            return { valid: false, msg: "Link is invalid, please try to reset your password again." };
        }

        const userEmail = this.base64Decode(ident);
        const user = await this.userService.findOne({ email: userEmail });
        const newHash = this.generateResetHash(user, tday);
        if (hash !== newHash) {
            return { valid: false, msg: "Link is invalid, please try to reset your password again." };
        }
        return { valid: true, user: user };
    }


    async reset(ident: string, today: string, hash: string, newPassword: string) {
        const resetResponse = await this.validateReset(ident, today, hash);
        if (resetResponse.valid) {
            const passwordHash = await this.hashPassword(newPassword);
            resetResponse.user.password = passwordHash;
            this.userService.flush();
            resetResponse.token = await this.signToken(resetResponse.user);
            return resetResponse;
        } else {
            return resetResponse;
        }
    }
}