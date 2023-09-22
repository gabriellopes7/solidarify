import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: ISignInInterface): Promise<any> {
    const user = await this.usersService
      .findByEmail(signInDto.email)
      .catch(() => undefined);
    if (!signInDto.password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Password is required',
      });
    }
    if (!user) throw new BadRequestException('User does not exist');

    const isMatch = bcrypt.compare(signInDto.password, user.password);

    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Incorrect Password',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
      }),
    };
  }
}
