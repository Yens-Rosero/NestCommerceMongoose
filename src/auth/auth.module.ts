import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { JwtStrategy } from './strategies/jwt.strategies';
import { LocalStrategy } from './strategies/local.strategies';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwt.secret,
        signOptions: { expiresIn: configService.jwt.expiresIn },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
