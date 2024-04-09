import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthenticationSchema } from './dto/base-user.dto'; // Import the UserAuthenticationSchema

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() userDto: UserAuthenticationSchema,
  ): Promise<string> {
    return this.authService.registerUser(userDto);
  }

  @Post('login')
  async loginUser(
    @Body() credentials: { email: string; password: string },
  ): Promise<string> {
    const { email, password } = credentials;
    return this.authService.loginUser(email, password);
  }
}
