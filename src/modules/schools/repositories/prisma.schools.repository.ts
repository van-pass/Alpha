import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { SchoolsRepository } from './schools.repository';
import { CreateSchoolBody } from '../dtos/create-school.dto';

@Injectable()
export class PrismaSchoolsRepository implements SchoolsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSchoolBody) {
    try {
      return await this.prisma.schools.create({
        data
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to create school.', {
        cause: new Error(),
        description: 'PSR-CR01'
      });
    }
  }

  async getByWhatsapp(whatsappNumber: string) {
    try {
      return await this.prisma.schools.findUnique({
        where: {
          whatsappNumber
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Unexpected error to find school by whatsapp number.',
        {
          cause: new Error(),
          description: 'PSR-GW01'
        }
      );
    }
  }

  async getById(id: number) {
    try {
      return await this.prisma.schools.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to find school by id.', {
        cause: new Error(),
        description: 'PSR-GI01'
      });
    }
  }
}
