import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthResponseDto } from '../dto';
import { UserService } from './../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: { sub: string; email: string }) {
        const user = await this.userService.findUserByUUID(payload.sub);

        return plainToClass(AuthResponseDto, user);
    }
}