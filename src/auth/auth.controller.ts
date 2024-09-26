import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.service';
import { ApiProperty } from '@nestjs/swagger';

class UserDto implements User {
  role: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: UserDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: UserDto) {
    return this.authService.signUp(signUpDto as User);
  }
}
