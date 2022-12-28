import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {ConfigModule, ConfigService} from '@nestjs/config';

import { TransactionsModule } from './transactions/transactions.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import configuration from "user/dist/config/configuration";

@Module({
  imports: [
    HttpModule,
    TransactionsModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoUri')
      }),
      inject: [ConfigService]
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('balance');
  }
}
