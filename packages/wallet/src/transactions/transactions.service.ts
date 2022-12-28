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

  async getUserBalance(userId: string): Promise<{ amount: number } | string> {
    return new Promise((resolve, reject) => {
      this.transaction.aggregate(
        [
          {
            $match: {
              userId,
            },
          },
          {
            $group: {
              _id: '$userId',
              balance: {
                $sum: '$amount',
              },
            },
          },
        ],
        (err, res) => {
          if (err || !res.length) {
            resolve({ amount: 0 });
          } else {
            resolve({ amount: res[0].balance });
          }
        },
      );
    });
  }
}
