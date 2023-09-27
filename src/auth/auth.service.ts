import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(signInDto: ISignInInterface, user: UserDocument): Promise<any> {
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
    const tokens = await this.getTokens(user.id, user.email);
    user.refreshToken = tokens.refreshToken;
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(id: ObjectId, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const saltOrRounds = Number(process.env.HASH_ROUNDS);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    return await this.userService.updateById(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}
