import { Controller, Post, UseGuards, Body } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Body('user') user: AuthenticationDto) {
    return this.authService.login(user);
  }
}
