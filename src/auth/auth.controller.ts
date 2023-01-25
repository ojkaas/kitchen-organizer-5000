import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { plainToClass } from "class-transformer";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({ dto: dto });
        return plainToClass(AuthResponseDto, this.authService.signup(dto));
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }
}