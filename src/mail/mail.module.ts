// email.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
  MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: configService.get<string>('SENDER_EMAIL'),
            pass: configService.get<string>('PASSWORD_EMAIL'),
          },
        },
        template: {
        dir: join(__dirname,'..','.././mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
        strict: true,
        },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }