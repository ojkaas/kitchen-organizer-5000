import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, Get, Param, BadRequestException } from "@nestjs/common";
import { NotFoundErrorFilter } from "../../core/dbase/not-found-error.interceptor";
import { UniqueConstraintErrorFilter } from "../../core/dbase/unique-constraint-error.interceptor";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { AuthForgotDto } from "./dto/auth-forgot.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('signup')
    @UseInterceptors(UniqueConstraintErrorFilter, NotFoundErrorFilter)
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }

    @Post('forgot')
    forgot(@Body() dto: AuthForgotDto) {
        return this.authService.forgot(dto);
    }

    @Get('reset/:ident/:today-:hash')
    @HttpCode(HttpStatus.NO_CONTENT)
    async validateReset(@Param('today') today: string, @Param('hash') hash: string, @Param('ident') ident: string) {
        const result = await this.authService.validateReset(ident, today, hash);
        if (!result.valid) throw new BadRequestException(result.msg);
    }

    @Post('reset/:ident/:today-:hash')
    async reset(@Param('today') today: string, @Param('hash') hash: string, @Param('ident') ident: string, @Body() dto: AuthResetDto) {
        const result = await this.authService.reset(ident, today, hash, dto.password);
        if (!result.valid) throw new BadRequestException(result.msg);
        return result.token;
    }
}