import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { ParentsRepository, CreateParentProps } from './parents.repository';

@Injectable()
export class PrismaParentsRepository implements ParentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateParentProps) {
    try {
      return await this.prisma.parents.create({
        data
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to create parent.', {
        cause: new Error(),
        description: 'PPR-CR01'
      });
    }
  }

  async getByWhatsapp(whatsappNumber: string) {
    try {
      return await this.prisma.parents.findUnique({
        where: {
          whatsappNumber
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Unexpected error to find parent by whatsapp number.',
        {
          cause: new Error(),
          description: 'PPR-GW01'
        }
      );
    }
  }

  async getById(id: number) {
    try {
      return await this.prisma.parents.findUnique({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to find parent by id.', {
        cause: new Error(),
        description: 'PPR-GI01'
      });
    }
  }
}
