import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Matches } from 'class-validator';

export class CreateParentBody {
  @IsNotEmpty({ message: 'driver id is required' })
  @IsNumber({}, { message: 'driver id must be a number' })
  @IsPositive({ message: 'driver id must be a positive number' })
  driverId: number;

  @IsNotEmpty({ message: 'parent name is required' })
  @IsString({ message: 'parent name must be a string' })
  @Length(3, 255, { message: 'parent name must be between 3 and 255 characters long' })
  name: string;

  @IsNotEmpty({ message: 'cpf is required' })
  @IsString({ message: 'cpf must be a string' })
  @Matches(/^\d{11}$/, {
    message: 'cpf must follow the format 11111111111 (11 digits)'
  })
  cpf: string;

  @IsNotEmpty({ message: 'whatsappNumber is required' })
  @IsString({ message: 'whatsappNumber must be a string' })
  @Matches(/^\d{13}$/, {
    message: 'whatsappNumber must follow the format 5511999998888 (13 digits)'
  })
  whatsappNumber: string;
}
