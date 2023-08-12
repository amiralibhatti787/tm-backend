import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginUserDto): Promise<any> {
    const user: any = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...rest } = user;

    const payload = { sub: rest };

    return {
      jwt: await this.jwtService.signAsync(payload),
    };
  }

  async getUser(id: string) {
    return this.usersService.getUser(id);
  }
}
