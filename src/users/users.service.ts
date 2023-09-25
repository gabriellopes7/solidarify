import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ObjectId, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: ICreateUser): Promise<User> {
    // const saltOrRounds = Number(process.env.HASH_ROUNDS);
    const saltOrRounds = Number(process.env.HASH_ROUNDS);
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createUserDto.isActive = true;
    createUserDto.password = hashPassword;
    return await this.usersRepository.save(createUserDto);
  }

  async update(userId: ObjectId, updateUserDto: IUpdateUser): Promise<any> {
    return await this.usersRepository.update(
      { id: userId },
      {
        refreshToken: updateUserDto.refreshToken,
      },
    );
  }

  async findAll(): Promise<User[]> {
    throw NotImplementedException;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
