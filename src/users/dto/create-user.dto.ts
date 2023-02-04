import { IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must be minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  is_active: boolean;
}
