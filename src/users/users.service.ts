import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: ICreateUserInterface): Promise<User> {
    createUserDto.isActive = true;
    createUserDto.isPrivate = true;
    return this.usersRepository.save(createUserDto);
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
