import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const userToken = await this.authService.validateUser(data);
    if (!userToken) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return userToken; // <-- Este return es el que envía el token a la respuesta
  }
}