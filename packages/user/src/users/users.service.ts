import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  private returnableFields = ['firstName', 'lastName', 'email'];

  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const usersList = await this.user
      .find(null)
      .select(this.returnableFields)
      .exec();

    return usersList.map((user) => new this.user(user).publicFields);
  }

  async findUser(id: string): Promise<User> {
    const userData = await this.user.findOne(
      { _id: id },
      this.returnableFields,
    );

    return new this.user(userData).publicFields;
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.user.findOne({ email });
  }

  async createUser(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = new this.user(data);
    await user.save();

    return user.publicFields;
  }

  async updateUser(
    id: string,
    data: Partial<UpdateUserDto>,
  ): Promise<Omit<User, 'password'>> {
    const userData = await this.user.findOneAndUpdate({ _id: id }, data);

    return new this.user(userData).publicFields;
  }

  async deleteUser(id: string): Promise<string> {
    await this.user.findOneAndDelete({ _id: id });

    return 'OK';
  }
}
