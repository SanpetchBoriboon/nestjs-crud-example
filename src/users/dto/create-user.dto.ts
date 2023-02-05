import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  is_active: boolean;
}
