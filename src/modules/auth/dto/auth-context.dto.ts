import { IsNotEmpty } from "class-validator";

export class AuthContextDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    roles: string[];
}