import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Transaction,
  TransactionDocument,
} from './entities/transactions.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transaction: Model<TransactionDocument>,
  ) {}

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    const transaction = new this.transaction(data);
    await transaction.save();

    return transaction.publicFields;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    const transactionsList = await this.transaction.find(null);

    return transactionsList.map(
      (transaction) => new this.transaction(transaction).publicFields,
    );
  }

  async getUserBalance(): Promise<void> {
    return this.transaction
      .aggregate([
        {
          $match: {
            userId: 123,
          },
        },
        {
          $group: {
            _id: '$userId',
            totalPoints: {
              $sum: {
                $cond: [
                  { $eq: ['type', 'DEBIT'] },
                  '$amount',
                  { $multiply: ['$amount', -1] },
                ],
              },
            },
          },
        },
      ])
      .exec(console.log);
  }
}
