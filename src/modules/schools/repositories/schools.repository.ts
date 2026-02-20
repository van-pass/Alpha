import { Schools } from 'src/core/prisma/generated/client';
import { CreateSchoolBody } from '../dtos/create-school.dto';

export abstract class SchoolsRepository {
  abstract create(data: CreateSchoolBody): Promise<Schools>;
  abstract getByWhatsapp(whatsappNumber: string): Promise<Schools | null>;
}
