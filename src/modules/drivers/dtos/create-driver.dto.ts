import { IsNotEmpty, Length, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateDriverBody {
  @IsNotEmpty({
    message: 'plate is required'
  })
  @IsString({
    message: 'plate must be a string'
  })
  @Matches(/^[A-Z0-9]{7}$/i, {
    message: 'plate must have 7 alphanumeric characters (e.g., ABC1234 or ABC1D23)'
  })
  plate: string;

  @IsNotEmpty({
    message: 'driver name is required'
  })
  @Length(3, 255, {
    message: 'driver name must be between 3 and 255 characters long'
  })
  name: string;

  @IsNotEmpty({
    message: 'email is required'
  })
  @IsString({
    message: 'email must be a string'
  })
  @MinLength(3, {
    message: 'email must be at least 3 characters long'
  })
  @MaxLength(255, {
    message: 'email must be at most 255 characters long'
  })
  email: string;

  @IsNotEmpty({
    message: 'password is required'
  })
  @IsString({
    message: 'password must be a string'
  })
  @MinLength(6, {
    message: 'password must be at least 6 characters long'
  })
  @MaxLength(255, {
    message: 'password must be at most 255 characters long'
  })
  password: string;

  @IsNotEmpty({
    message: 'whatsappNumber is required'
  })
  @IsString({
    message: 'whatsappNumber must be a string'
  })
  @Matches(/^\d{13}$/, {
    message: 'whatsappNumber must follow the format 5511999998888 (13 digits)'
  })
  whatsappNumber: string;
}
