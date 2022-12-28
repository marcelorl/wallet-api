import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: User.name, useFactory: () => UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
