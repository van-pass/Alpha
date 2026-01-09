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

      throw new InternalServerErrorException('Unexpected error to find driver by email.', {
        cause: new Error(),
        description: 'PDR-GE01'
      });
    }
  }

  async getById(id: number) {
    try {
      return await this.prisma.drivers.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to find driver by id.', {
        cause: new Error(),
        description: 'PDR-GI01'
      });
    }
  }

  async getByWhatsapp(whatsappNumber: string) {
    try {
      return await this.prisma.drivers.findUnique({
        where: {
          whatsappNumber
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Unexpected error to find driver by whatsapp number.',
        {
          cause: new Error(),
          description: 'PDR-GW01'
        }
      );
    }
  }
}
