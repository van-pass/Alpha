import {
  IsNotEmpty,
  Length,
  IsString,
  IsEmail,
  Matches,
  MinLength,
  IsUppercase
} from 'class-validator';

export class CreateDriverBody {
  @IsNotEmpty({ message: 'plate is required' })
  @IsString({ message: 'plate must be a string' })
  @IsUppercase({ message: 'plate must be uppercase' })
  @Matches(/^[A-Z0-9]{7}$/, {
    message: 'plate must have 7 alphanumeric characters (e.g., ABC1234 or ABC1D23)'
  })
  plate: string;

  @IsNotEmpty({ message: 'driver name is required' })
  @IsString({ message: 'driver name must be a string' })
  @Length(3, 255, { message: 'driver name must be between 3 and 255 characters long' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email format' })
  @Length(3, 255, { message: 'email must be between 3 and 255 characters long' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'whatsappNumber is required' })
  @IsString({ message: 'whatsappNumber must be a string' })
  @Matches(/^\d{13}$/, {
    message: 'whatsappNumber must follow the format 5511999998888 (13 digits)'
  })
  whatsappNumber: string;
}
