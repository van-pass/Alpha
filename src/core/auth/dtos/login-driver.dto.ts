import { IsNotEmpty, Length, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginDriverBody {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email format' })
  @Length(3, 255, { message: 'email must be between 3 and 255 characters long' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;
}
