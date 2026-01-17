import { Module } from '@nestjs/common';

import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoicesRepository } from './repositories/invoices.repository';
import { PrismaInvoicesRepository } from './repositories/prisma.invoices.repository';
import { AsaasModule } from 'src/core/integrations/asaas/asaas.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [AsaasModule, StudentsModule],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    {
      provide: InvoicesRepository,
      useClass: PrismaInvoicesRepository
    }
  ]
})
export class InvoicesModule {}
