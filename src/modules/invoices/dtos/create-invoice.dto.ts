import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateInvoiceBody {
  @IsNotEmpty({ message: 'driver id is required' })
  @IsInt({ message: 'driver id must be an integer' })
  @IsPositive({ message: 'driver id must be a positive number' })
  driverId: number;

  @IsNotEmpty({ message: 'parent id is required' })
  @IsInt({ message: 'parent id must be an integer' })
  @IsPositive({ message: 'parent id must be a positive number' })
  parentId: number;

  @IsNotEmpty({ message: 'student id is required' })
  @IsInt({ message: 'student id must be an integer' })
  @IsPositive({ message: 'student id must be a positive number' })
  studentId: number;
}
