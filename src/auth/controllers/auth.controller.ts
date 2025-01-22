import {
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AuthService } from '../services/auth.service';
import { userWithId } from 'src/models/token.model';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user as userWithId;
    return this.authService.generateJwtToken(user);
  }
}
