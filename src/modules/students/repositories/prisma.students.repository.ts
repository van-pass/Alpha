import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { StudentsRepository } from './students.repository';
import { CreateStudentBody } from '../dtos/create-student.dto';

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(driverId: number, data: CreateStudentBody) {
    try {
      return await this.prisma.students.create({
        data: {
          driverId,
          ...data
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to create student.', {
        cause: new Error(),
        description: 'PSR-CR01'
      });
    }
  }

  async getById(id: number) {
    try {
      return await this.prisma.students.findUnique({
        where: {
          id
        },
        include: {
          parent: true
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to find student by id.', {
        cause: new Error(),
        description: 'PSR-GI01'
      });
    }
  }

  async listAll(driverId: number) {
    try {
      return await this.prisma.students.findMany({
        where: {
          driverId
        },
        select: {
          id: true,
          name: true,
          isActive: true,
          dueDay: true,
          monthlyFee: true,
          parent: {
            select: {
              name: true
            }
          },
          school: {
            select: {
              name: true
            }
          }
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to list students.', {
        cause: new Error(),
        description: 'PSR-LA01'
      });
    }
  }
}
