import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
