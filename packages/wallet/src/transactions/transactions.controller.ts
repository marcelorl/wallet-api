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
  getUserBalance(@Response() res) {
    console.log('locals->', res.locals);
    return this.transactionService.getUserBalance();
  }
}
