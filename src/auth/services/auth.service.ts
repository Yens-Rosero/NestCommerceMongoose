import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { payloadToken, userWithId } from 'src/models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const ifPasswordMatching = await bcrypt.compare(password, user.password);
      if (ifPasswordMatching) {
        return user;
      }
    }
    return null;
  }

  async generateJwtToken(user: userWithId) {
    const payload: payloadToken = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
