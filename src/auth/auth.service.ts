import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      console.log('user not found');
      throw new UnauthorizedException();
    }
    const isPasswordValid = await compare(pass, user.password);
    if (!isPasswordValid) {
      console.log('password not valid');
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp({ email, password, role }: User) {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await hash(password, 10);

    return this.usersService.create({
      email,
      password: hashedPassword,
      role,
    });
  }

  async validateAccessToken(access_token: string) {
    const payload = await this.jwtService.verifyAsync(access_token);
    return payload;
  }
}
