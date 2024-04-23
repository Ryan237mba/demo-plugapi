import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} from 'src/common/const';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT > 25,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  send(to: string, subject: string, message: string) {
    return this.transporter.sendMail({
      html: message,
      to,
      subject,
      from: 'Primus Plug <no-reply@primusplug.io>',
    });
  }
}
