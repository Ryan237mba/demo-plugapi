import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_SECRET } from 'src/common/const';
import { AuthHandler } from './auth.handler';
import { CacheModule } from '@nestjs/cache-manager';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CacheModule.register(),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthHandler,
    MailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
