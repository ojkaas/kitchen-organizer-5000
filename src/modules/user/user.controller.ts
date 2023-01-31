import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { AuthResponseDto } from '../auth/dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: AuthResponseDto) {
        return user;
    }
}
