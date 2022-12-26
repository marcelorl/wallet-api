import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(
      //'mongodb://root:pass12345@localhost:27017/user?serverSelectionTimeoutMS=2000&authSource=admin',
      'mongodb://localhost:27017/user?serverSelectionTimeoutMS=2000&authSource=admin',
    ),
  ],
})
export class AppModule {}
