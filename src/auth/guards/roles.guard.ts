import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decoratorts/roles.decorator';
import { Role, ROLE_HIERARCHY } from 'src/models/roles.model';
import { payloadToken } from 'src/models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as payloadToken;

    // Check if user and role exist
    if (!user || !user.role) {
      throw new UnauthorizedException('No role provided');
    }

    // Get user's role hierarchy level
    const userRoleLevel = ROLE_HIERARCHY[user.role];

    // Get minimum required role level from all required roles
    const requiredRoleLevel = Math.min(
      ...requiredRoles.map((role) => ROLE_HIERARCHY[role]),
    );

    // Check if user's role level is sufficient
    const hasPermission = userRoleLevel >= requiredRoleLevel;

    if (!hasPermission) {
      throw new UnauthorizedException(
        `Your role (${user.role}) does not have sufficient permissions`,
      );
    }

    return true;
  }
}
