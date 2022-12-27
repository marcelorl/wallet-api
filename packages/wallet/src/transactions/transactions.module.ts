import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSchema } from './entities/transactions.entity';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Transaction.name, useFactory: () => TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
