import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { StudentsRepository } from './students.repository';
import { CreateStudentBody } from '../dtos/create-student.dto';

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentBody) {
    try {
      return await this.prisma.students.create({
        data
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to create student.', {
        cause: new Error(),
        description: 'PSR-CR01'
      });
    }
  }
}
