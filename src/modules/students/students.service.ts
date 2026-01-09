import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateStudentBody } from './dtos/create-student.dto';
import { StudentsRepository } from './repositories/students.repository';
import { DriversRepository } from '../drivers/repositories/drivers.repository';
import { ParentsRepository } from '../parents/repositories/parents.repository';

@Injectable()
export class StudentsService {
  constructor(
    private readonly repository: StudentsRepository,
    private readonly driversRepository: DriversRepository,
    private readonly parentsRepository: ParentsRepository
  ) {}

  async register(data: CreateStudentBody) {
    const currentMonthMaxDays = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    if (data.dueDay > currentMonthMaxDays) {
      throw new ConflictException(
        'Due day must be less than or equal to the last day of the current month.',
        {
          description: 'STS-RE03'
        }
      );
    }

    const driverExists = await this.driversRepository.getById(data.driverId);

    if (!driverExists) {
      throw new NotFoundException('The provided driver does not exist.', {
        description: 'STS-RE02'
      });
    }

    const parentExists = await this.parentsRepository.getById(data.parentId);

    if (!parentExists) {
      throw new NotFoundException('The provided parent does not exist.', {
        description: 'STS-RE01'
      });
    }

    const { id, name, monthlyFee, dueDay } = await this.repository.create(data);

    return {
      data: {
        id,
        name,
        monthlyFee,
        dueDay
      }
    };
  }
}
