import { Module } from '@nestjs/common';

import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { AsaasModule } from 'src/core/integrations/asaas/asaas.module';
import { InvoicesDataModule } from './invoices-data.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [AsaasModule, InvoicesDataModule, StudentsModule],
  controllers: [InvoicesController],
  providers: [InvoicesService]
})
export class InvoicesModule {}
