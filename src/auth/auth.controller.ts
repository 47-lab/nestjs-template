import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
class UserDto implements User {
  role: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

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
    try {
      const validatedUser = schema.parse(signUpDto);
      return this.authService.signUp(validatedUser as User);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
