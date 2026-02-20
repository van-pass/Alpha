import { IsNotEmpty, IsString, Length, Matches, IsPostalCode } from 'class-validator';

export class CreateSchoolBody {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @Length(3, 255, { message: 'name must be between 3 and 255 characters long' })
  name: string;

  @IsNotEmpty({ message: 'whatsappNumber is required' })
  @IsString({ message: 'whatsappNumber must be a string' })
  @Matches(/^\d{13}$/, {
    message: 'whatsappNumber must follow the format 5511999998888 (13 digits)'
  })
  whatsappNumber: string;

  @IsNotEmpty({ message: 'state is required' })
  @IsString({ message: 'state must be a string' })
  @Length(2, 2, { message: 'state must be exactly 2 characters long' })
  state: string;

  @IsNotEmpty({ message: 'city is required' })
  @IsString({ message: 'city must be a string' })
  @Length(2, 255, { message: 'city must be between 2 and 255 characters long' })
  city: string;

  @IsNotEmpty({ message: 'neighborhood is required' })
  @IsString({ message: 'neighborhood must be a string' })
  @Length(2, 255, { message: 'neighborhood must be between 2 and 255 characters long' })
  neighborhood: string;

  @IsNotEmpty({ message: 'street is required' })
  @IsString({ message: 'street must be a string' })
  @Length(2, 255, { message: 'street must be between 2 and 255 characters long' })
  street: string;

  @IsNotEmpty({ message: 'number is required' })
  @IsString({ message: 'number must be a string' })
  number: string;

  @IsNotEmpty({ message: 'zip code is required' })
  @IsPostalCode('BR', { message: 'invalid brazilian zip code format' })
  zipCode: string;
}
