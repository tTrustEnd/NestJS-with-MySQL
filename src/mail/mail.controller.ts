import { Controller, Post, Body, Get } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Public } from 'decorator/customize';
import { Cron } from '@nestjs/schedule/dist';
@Controller('mail')
export class MailController {
  constructor(private readonly mailerService: MailerService) { }

  @Get()
  @Cron('0 0 0 * * 6')
  @Public()
  async handleTestEmail() {
    await this.mailerService.sendMail({
      to: "truong.nq1857283@gmail.com",
      from: '"HELLO" <banoianh1x@gmail.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'test',
      context:{
        name:"Trường nè"
      }
    });
  }
}