import { Students, Parents } from 'src/core/prisma/generated/client';
import { CreateStudentBody } from '../dtos/create-student.dto';

export abstract class StudentsRepository {
  abstract create(driverId: number, data: CreateStudentBody): Promise<Students>;
  abstract getById(id: number): Promise<(Students & { parent: Parents }) | null>;
}
