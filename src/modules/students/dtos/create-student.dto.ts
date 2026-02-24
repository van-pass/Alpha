import {
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsPositive,
  Max,
  Min,
  IsInt,
  IsPostalCode
} from 'class-validator';

export class CreateStudentBody {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @Length(3, 255, { message: 'name must be between 3 and 255 characters long' })
  name: string;

  @IsNotEmpty({ message: 'monthly fee is required' })
  @IsNumber({}, { message: 'monthly fee must be a number' })
  @IsPositive({ message: 'monthly fee must be a positive number' })
  monthlyFee: number;

  @IsNotEmpty({ message: 'due day is required' })
  @IsInt({ message: 'due day must be an integer' })
  @Min(1, { message: 'due day must be at least 1' })
  @Max(31, { message: 'due day must be less than or equal to 31' })
  dueDay: number;

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

  @IsNotEmpty({ message: 'driver id is required' })
  @IsInt({ message: 'driver id must be an integer' })
  @IsPositive({ message: 'driver id must be a positive number' })
  @Min(1, { message: 'driver id must be greater than 0' })
  driverId: number;

  @IsNotEmpty({ message: 'parent id is required' })
  @IsInt({ message: 'parent id must be an integer' })
  @IsPositive({ message: 'parent id must be a positive number' })
  @Min(1, { message: 'parent id must be greater than 0' })
  parentId: number;

  @IsNotEmpty({ message: 'school id is required' })
  @IsInt({ message: 'school id must be an integer' })
  @IsPositive({ message: 'school id must be a positive number' })
  @Min(1, { message: 'school id must be greater than 0' })
  schoolId: number;
}
