import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../users/entities/user.entity';
import { APP_URL } from 'src/common/const';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email, true);
    if (!user) throw new UnauthorizedException('INCORRECT_EMAIL');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('INCORRECT_PASSWORD');

    return user;
  }

  login(payload: any) {
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '30d',
      }),
    };
  }

  async register(dto: RegisterDto, role: UserRole) {
    return await this.userService.create(dto, role);
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const { firstName } = user;
    const token = this.jwtService.sign({ email }, { expiresIn: '15m' });
    const base64Token = btoa(token);
    const resetLink = `${APP_URL}/auth/reset-password?token=${base64Token}`;

    return this.mailService.send(
      email,
      'Reset Your Password',
      `Hi ${firstName},\nYou requested to reset your password. Please follow the subsequent link to reset your passwork : ${resetLink}`,
    );
  }

  resetPassword(token: string, password: string) {
    const jwtoken = atob(token);
    const data = this.jwtService.decode(jwtoken) as { [key: string]: any };
    return this.userService.resetPassword(data.email, password);
  }
}
