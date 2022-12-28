import { IsDefined, IsString } from 'class-validator';

export class FindUserByIdDto {
  @IsDefined()
  @IsString()
  id: string;
}
