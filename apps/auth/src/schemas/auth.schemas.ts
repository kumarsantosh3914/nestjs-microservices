import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Assuming a minimum password length of 6 characters
  password: string;
}
