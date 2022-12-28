import { Controller, Post, Body, Get, Response } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post('/transactions')
  createTransaction(@Body() body: CreateTransactionDto) {
    return this.transactionService.createTransaction(body);
  }

  @Get('/transactions')
  getAllTransactions(@Body() body) {
    return this.transactionService.getAllTransactions();
  }

  @Get('/balance')
  async getUserBalance(@Response() res) {
    res.json(await this.transactionService.getUserBalance(res.locals.id));
  }
}
