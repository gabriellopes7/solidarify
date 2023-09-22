import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInDto: ISignInInterface): Promise<any> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    return result;
  }
}
