import { AuthDto } from "./auth.dto";
import { Exclude } from 'class-transformer';

export class AuthResponseDto extends AuthDto {
    @Exclude()
    password: string;
}