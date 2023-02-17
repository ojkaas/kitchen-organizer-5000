import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from "@nestjs/common/decorators";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { MailService } from "./mail.service";

interface MailTransportConfig {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized: boolean;
  };
}

@Global() // 👈 global module
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const mailConfig = {
          transport: {
            host: config.get('MAIL_HOST'),
            port: config.get('MAIL_PORT'),
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASSWORD'),
            },
          } as MailTransportConfig,
          defaults: {
            from: `"No Reply" <${config.get('MAIL_FROM')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          }
        };

        const isSecure = config.get('MAIL_SECURE');
        if (isSecure === 'true') {
          mailConfig.transport.secure = isSecure;
          mailConfig.transport.tls = { rejectUnauthorized: false };
        }

        return mailConfig;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }