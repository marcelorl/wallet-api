import { IsDefined, IsString } from 'class-validator';

export class AuthenticationDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
