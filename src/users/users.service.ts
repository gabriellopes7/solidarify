import { Injectable, NotImplementedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: ICreateUserInterface): Promise<User> {
    throw NotImplementedException;
  }

  async findAll(): Promise<User[]> {
    throw NotImplementedException;
  }

  async findOne(): Promise<User | null> {
    throw NotImplementedException;
  }

  async remove(id: number): Promise<void> {
    throw NotImplementedException;
  }
}
