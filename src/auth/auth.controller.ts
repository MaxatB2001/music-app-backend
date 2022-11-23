import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
