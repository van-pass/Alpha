import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDriverBody } from './dtos/login-driver.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('drivers/login')
  async loginDriver(@Body() body: LoginDriverBody) {
    return await this.authService.loginDriver(body.email, body.password);
  }
}
