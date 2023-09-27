import {
  Body,
  ConflictException,
  Controller,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { IGetUser } from './interfaces/getUser.interface';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('This email is already being used.');
    }

    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  //   @Get(':id')
  //   async getUserById(@Param('id') id: string) {
  //     const user = await this.userService.findById(id);
  //     return user;
  //   }

  @Get()
  async getUserByEmail(
    @Body() getUserDto: IGetUser,
  ): Promise<User | undefined> {
    const user = await this.userService.findByEmail(getUserDto.email);
    return user;
  }
}
