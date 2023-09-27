import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { IUpdateUser } from './interfaces/updateUser.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserDocument | undefined> {
    const saltOrRounds = Number(process.env.HASH_ROUNDS);
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createUserDto.isActive = true;
    createUserDto.password = hashPassword;
    const createdUser = await this.userModel.create(createUserDto);
    // await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }

  async findById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async updateById(id: string, updateUserInterface: IUpdateUser) {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserInterface, {
        new: true,
        runValidators: true,
      })
      .exec();
  }
}
