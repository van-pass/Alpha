import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';

import { CreateDriverBody } from '../dtos/create-driver.dto';
import { DriversRepository } from './drivers.repository';

@Injectable()
export class PrismaDriversRepository implements DriversRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDriverBody) {
    try {
      return await this.prisma.drivers.create({
        data
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to create driver.', {
        cause: new Error(),
        description: 'PDR-CR01'
      });
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.prisma.drivers.findUnique({
        where: {
          email
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to get driver.', {
        cause: new Error(),
        description: 'PDR-GE01'
      });
    }
  }
}
