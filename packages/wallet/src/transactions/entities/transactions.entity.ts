import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ id: true, virtuals: true, versionKey: false })
export class Transaction {
  @Prop(String)
  userId: string;

  @Prop(Number)
  amount: number;

  @Prop({ type: String, enum: ['CREDIT', 'DEBIT'] })
  type: string;

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
