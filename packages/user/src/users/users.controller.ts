import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdDto } from './dto/find-by-id.dto';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Patch('/:id')
  updateUser(
    @Param() { id }: FindUserByIdDto,
    @Body() body: Partial<UpdateUserDto>,
  ) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param() { id }: FindUserByIdDto) {
    return this.userService.deleteUser(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  findUser(@Param() { id }: FindUserByIdDto) {
    return this.userService.findUser(id);
  }
}
