import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsDefined()
  userId: string;

  @IsString()
  @IsDefined()
  amount: string;

  @IsNumber()
  @IsDefined()
  type: number;
}
