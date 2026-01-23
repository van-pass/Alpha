import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';
import { Invoices } from 'src/core/prisma/generated/client';
import { InvoicesRepository } from './invoices.repository';

@Injectable()
export class PrismaInvoicesRepository implements InvoicesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Omit<Invoices, 'id' | 'status'>) {
    try {
      return await this.prisma.invoices.create({
        data
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to create invoice.', {
        cause: new Error(),
        description: 'PIR-CR01'
      });
    }
  }

  async updateStatus(transactionId: string, status: Invoices['status']) {
    try {
      return await this.prisma.invoices.updateMany({
        where: {
          transactionId,
          status: {
            not: status
          }
        },
        data: {
          status
        }
      });
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Unexpected error to mark invoice as paid.', {
        cause: new Error(),
        description: 'PIR-MP01'
      });
    }
  }
}
