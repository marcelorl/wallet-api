import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { UsersService } from '../users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
  ) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);

    return bcrypt.compare(pass, user.password);
  }

  async login(crendentials: { email: string; password: string }) {
    const userData = await this.usersService.findUserByEmail(
      crendentials.email,
    );

    return {
      user: new this.user(userData).publicFields,
      access_token: this.jwtService.sign(crendentials),
    };
  }
}