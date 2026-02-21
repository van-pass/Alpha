import { Module } from '@nestjs/common';
import { InvoicesRepository } from './repositories/invoices.repository';
import { PrismaInvoicesRepository } from './repositories/prisma.invoices.repository';

@Module({
  providers: [
    {
      provide: InvoicesRepository,
      useClass: PrismaInvoicesRepository
    }
  ],
  exports: [InvoicesRepository]
})
export class InvoicesDataModule {}
