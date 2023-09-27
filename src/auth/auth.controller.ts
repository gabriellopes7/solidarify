import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Get,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    if (!signInDto.email) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Email is required',
      });
    }

    if (!signInDto.password) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Password is required',
      });
    }

    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) throw new BadRequestException('User does not exist');
    try {
      return await this.authService.signIn(signInDto, user);
    } catch (e) {
      throw new RequestTimeoutException('Error on logging user', {
        cause: e,
      });
    }
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

    try {
      const newUser = await this.userService.create(createUserDto);
      const tokens = await this.authService.getTokens(
        newUser.id,
        newUser.email,
      );
      await this.authService.updateRefreshToken(
        newUser.id,
        tokens.refreshToken,
      );
      return tokens;
    } catch (e) {
      throw new RequestTimeoutException('Error on creating new user', {
        cause: e,
      });
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request): Promise<void> {
    try {
      await this.authService.logout(req.user['sub']);
    } catch (e) {
      throw new RequestTimeoutException('Error on logging out', {
        cause: e,
      });
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    try {
      return await this.authService.refreshTokens(userId, refreshToken);
    } catch (e) {
      throw new RequestTimeoutException('Error on logging out', {
        cause: e,
      });
    }
  }
}
