import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'user[email]', passwordField: 'user[password]' });
  }

  async validate(username: string, password: string): Promise<boolean> {
    const isUserValid = await this.authService.validateUser(username, password);
    if (!isUserValid) {
      throw new UnauthorizedException();
    }
    return isUserValid;
  }
}
