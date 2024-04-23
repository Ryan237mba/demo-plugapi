import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BaseHandler } from 'src/common/shared/base-handler';
import { User } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { APP_URL } from 'src/common/const';

export const AUTH_LOGIN_EVENT = 'auth.login';
export const AUTH_REGISTER_EVENT = 'auth.register';

@Injectable()
export class AuthHandler extends BaseHandler {
  constructor(private readonly mailService: MailService) {
    super(AuthHandler.name);
  }

  @OnEvent(AUTH_LOGIN_EVENT)
  handleLogin(user: User) {
    this.logger.log(`New login :> ${JSON.stringify(user)}`);
  }

  @OnEvent(AUTH_REGISTER_EVENT)
  async handleRegister(payload: any) {
    const { firstName, email, token } = payload;
    const response = await this.mailService.send(
      email,
      'Confirm your email address',
      `Hi ${firstName} and welcome to Primus Plug. Please verify your email address by following this link : ${APP_URL}/v1/auth/verify-email?token=${token}`,
    );
    this.logger.log(response);
  }
}
