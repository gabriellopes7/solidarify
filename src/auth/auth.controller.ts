import {
  BadRequestException,
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
import { SignUpDto } from './dtos/signUp.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    if (!signInDto.password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Password is required',
      });
    }
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) throw new BadRequestException('User does not exist');

    return this.authService.signIn(signInDto, user);
  }

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignUpDto | undefined> {
    const user = await this.userService.findByEmail(createUserDto.email);
    console.log(user);
    if (user) {
      throw new ConflictException('This email is already being used.');
    }

    const newUser = await this.userService.create(createUserDto);
    const tokens = await this.authService.getTokens(newUser.id, newUser.email);
    await this.authService.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }
}
