import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

function transformAmount(amount: number) {
  if (this.type === 'DEBIT') {
    return amount * -1;
  }

  return amount;
}

@Schema({ id: true, virtuals: true, versionKey: false })
export class Transaction {
  @Prop(String)
  userId: string;

  @Prop({ type: String, enum: ['CREDIT', 'DEBIT'] })
  type: string;

  @Prop({ type: Number, set: transformAmount })
  amount: number;

  publicFields?: any;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.virtual('publicFields').get(function () {
  return {
    id: this._id,
    userId: this.userId,
    amount: this.amount,
  };
});
