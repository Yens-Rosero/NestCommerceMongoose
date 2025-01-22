import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decoratorts/public.decorator';
import config from 'src/config';
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    const isAuth = authHeader === this.configService.api.key;
    if (!isAuth) {
      throw new UnauthorizedException('Not authorized');
    }
    return isAuth;
  }
}
