import { Students, Parents } from 'src/core/prisma/generated/client';
import { CreateStudentBody } from '../dtos/create-student.dto';

type listAllResponse = Pick<Students, 'id' | 'name' | 'isActive' | 'dueDay' | 'monthlyFee'> & {
  parent: Pick<Parents, 'name'>;
  school: Pick<Parents, 'name'>;
};

export abstract class StudentsRepository {
  abstract create(driverId: number, data: CreateStudentBody): Promise<Students>;
  abstract getById(id: number): Promise<(Students & { parent: Parents }) | null>;
  abstract listAll(driverId: number): Promise<listAllResponse[]>;
}
