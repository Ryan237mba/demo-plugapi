import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseJwt } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guards/local.guard';
import * as _ from 'lodash';
import { URequest } from 'src/common/shared/request';
import { AUTH_LOGIN_EVENT, AUTH_REGISTER_EVENT } from './auth.handler';
import { UsersService } from '../users/users.service';
import { sendError } from 'src/common/helpers';
import { BaseController } from 'src/common/shared/base-controller';
import { UserRole } from '../users/entities/user.entity';
import { Document } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags('Auth')
export class AuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly event: EventEmitter2,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() _req: URequest) {
    this.event.emit(AUTH_LOGIN_EVENT, _req.user);
    const payload = this._serialize(_req.user.toJSON());
    return { user: payload, ...this.authService.login(payload) };
  }

  @ApiOperation({ summary: "Get current user's data" })
  @ApiBearerAuth()
  @UseJwt()
  @Get('me')
  async me(@Req() _req: URequest) {
    try {
      const user = await this.usersService.findOne(_req.user._id);
      return _.omit(user.toJSON(), 'password');
    } catch (error) {
      sendError(error);
    }
  }

  @ApiOperation({ summary: 'Register an engineer' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this._register(dto, UserRole.engineer);
  }

  @ApiOperation({ summary: 'Register a client' })
  @Post('register/client')
  async registerClient(@Body() dto: RegisterDto) {
    return this._register(dto, UserRole.client);
  }

  @ApiOperation({ summary: 'Verify user email' })
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.run(async () => {
      const { id } = this.jwtService.decode(token) as any;
      this.usersService.confirmEmail(id);
      return true;
    });
  }

  @ApiOperation({ summary: "Update current user's data" })
  @ApiBearerAuth()
  @UseJwt()
  @Patch('me')
  updateUser(@Body() dto: UpdateUserDto, @Req() { user }: URequest) {
    return this.run(async () => {
      return this.usersService.update(user._id, dto);
    });
  }

  @ApiOperation({ summary: 'Request for a password reset email' })
  @Post('forgot-password')
  requestPasswordReset(@Body() { email }: ForgotPasswordDto) {
    return this.run(async () => {
      return this.authService.requestPasswordReset(email);
    });
  }

  @ApiOperation({ summary: 'Reset user password' })
  @Post('reset-password')
  resetPassword(@Body() { password, token }: ResetPasswordDto) {
    return this.run(async () => {
      const user = await this.authService.resetPassword(token, password);
      return {
        user: user.toJSON(),
        ...this.authService.login(this._serialize(user.toJSON())),
      };
    });
  }

  private async _register(dto: RegisterDto, role: UserRole) {
    return await this.run(async () => {
      const user = await this.usersService.create(dto, role);
      const payload = this._serialize(user.toJSON());
      this.jwtService
        .signAsync({ id: user.id }, { expiresIn: '15m' })
        .then((token) => {
          this.event.emit(AUTH_REGISTER_EVENT, { ...dto, token });
        });
      return { user: user.toJSON(), ...this.authService.login(payload) };
    });
  }

  private _serialize(user: Document<any>) {
    return _.pick(user, ['_id', 'role', 'email']);
  }
}
