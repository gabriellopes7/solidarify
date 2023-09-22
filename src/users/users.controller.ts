import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    createUserDto.isActive = true;
    createUserDto.isPrivate = true;
    return await this.userService.create(createUserDto);
  }
}
