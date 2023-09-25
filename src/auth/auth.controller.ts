import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignUpDto | undefined> {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('This email is already being used.');
    }

    const newUser = await this.userService.create(createUserDto);
    const tokens = await this.authService.getTokens(newUser.id, newUser.email);
    await this.authService.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }
}
