import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { TransactionsModule } from './transactions/transactions.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    HttpModule,
    TransactionsModule,
    MongooseModule.forRoot(
      //'mongodb://root:pass12345@localhost:27017/user?serverSelectionTimeoutMS=2000&authSource=admin',
      'mongodb://localhost:27017/wallet?serverSelectionTimeoutMS=2000&authSource=admin',
    ),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('balance');
  }
}
