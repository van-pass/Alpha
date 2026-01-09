import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateParentBody {
  @IsNotEmpty({ message: 'parent name is required' })
  @IsString({ message: 'parent name must be a string' })
  @Length(3, 255, { message: 'parent name must be between 3 and 255 characters long' })
  name: string;

  @IsNotEmpty({ message: 'whatsappNumber is required' })
  @IsString({ message: 'whatsappNumber must be a string' })
  @Matches(/^\d{13}$/, {
    message: 'whatsappNumber must follow the format 5511999998888 (13 digits)'
  })
  whatsappNumber: string;
}
