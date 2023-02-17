import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ServiceUnavailableException } from '@nestjs/common/exceptions';
import { AuthDto } from '../auth/dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendPasswordReset(user: AuthDto, ident: string, token: string) {
        const url = `https://kitchenorganizer.ojkaas.nl/reset/${ident}/${token}`;
        //try {
        await this.mailerService.sendMail({
            to: user.email,
            from: '"Kitchen organizer 5000" <bla@ojkaas.nl>',
            subject: 'Kitchen organizer 5000 - Password reset requested',
            template: './reset',
            context: {
                name: user.name,
                url,
            },
        });
        //} catch (e) {
        //    throw new ServiceUnavailableException("Cannot send password reset email, please try again");
        //}
    }
}