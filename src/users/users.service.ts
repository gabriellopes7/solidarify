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
    return this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    throw NotImplementedException;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    throw NotImplementedException;
  }
}
