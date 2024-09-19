import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { EmailTemplate, emailTemplates } from './email-templates';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('email.smtpHost'),
      port: configService.get<number>('email.smtpPort'),
      secure: configService.get<boolean>('email.secure'),
      auth: {
        user: configService.get<string>('email.user'),
        pass: configService.get<string>('email.password'),
      },
    });
  }

  private async send(mailOptions: nodemailer.SendMailOptions): Promise<SentMessageInfo> {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${mailOptions.to}: ${info.response}`);
      return info;
    } catch (err) {
      console.error(`Error sending email to ${mailOptions.to}`, err);
      throw err;
    }
  }

  async sendEmailFromTemplate(data: {
    from?: string;
    replyTo?: string;
    to: string;
    templateId: EmailTemplate;
    dynamicTemplateData: object;
  }) {
    const { from, replyTo, to, templateId, dynamicTemplateData } = data;

    const html = this.renderTemplate(templateId, dynamicTemplateData);

    await this.send({
      from: this.configService.get<string>('email.user'),
      replyTo: replyTo || from || undefined,
      to,
      subject: this.getSubjectByTemplate(templateId),
      html,
    });
  }

  private renderTemplate(templateId: EmailTemplate, data: object): string {
    const template = emailTemplates[templateId];
    if (!template) {
      throw new Error(`Template with ID ${templateId} not found`);
    }
    return template(data);
  }

  private getSubjectByTemplate(templateId: EmailTemplate): string {
    switch (templateId) {
      case EmailTemplate.OTP:
        return 'Your OTP Code';
      case EmailTemplate.VERIFY_EMAIL:
        return 'Verify Your Email Address!';
      default:
        return 'Notification';
    }
  }
}
