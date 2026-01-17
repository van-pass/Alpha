import { ConflictException, Injectable } from '@nestjs/common';

import { Decimal } from '@prisma/client/runtime/client';

import { CreateInvoiceBody } from './dtos/create-invoice.dto';
import { InvoicesRepository } from './repositories/invoices.repository';
import { StudentsRepository } from '../students/repositories/students.repository';
import { AsaasService } from 'src/core/integrations/asaas/asaas.service';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly repository: InvoicesRepository,
    private readonly studentsRepository: StudentsRepository,
    private readonly asaasService: AsaasService
  ) {}

  async create({ studentId, parentId, driverId }: CreateInvoiceBody) {
    const existingStudent = await this.studentsRepository.getById(studentId);

    if (!existingStudent) {
      throw new ConflictException('Student with this id does not exist.', {
        description: 'INV-CR04'
      });
    }

    if (existingStudent.parentId !== parentId) {
      throw new ConflictException('The provided parent is not the student parent.', {
        description: 'INV-CR03'
      });
    }

    if (existingStudent.driverId !== driverId) {
      throw new ConflictException('The provided driver is not the student driver.', {
        description: 'INV-CR02'
      });
    }

    const existingAsaasCustomer = await this.asaasService.getCustomer(existingStudent.parent.cpf);

    if (!existingAsaasCustomer) {
      throw new ConflictException("There is no customer linked to this student's parent.", {
        description: 'INV-CR01'
      });
    }

    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const asaasInvoice = await this.asaasService.createInvoice({
      customer: existingAsaasCustomer.id,
      billingType: 'PIX',
      value: Number(existingStudent.monthlyFee),
      dueDate: new Date().toLocaleDateString('en-CA'),
      externalReference: `ST_${studentId}`,
      description: `Invoice for student ${existingStudent.name} - ${month}/${year}`
    });

    const invoice = await this.repository.create({
      amount: new Decimal(asaasInvoice.value),
      netAmount: new Decimal(asaasInvoice.netValue),
      dueDate: new Date(asaasInvoice.dueDate),
      url: asaasInvoice.invoiceUrl,
      transactionId: asaasInvoice.id,
      invoiceNumber: asaasInvoice.invoiceNumber
    });

    return { data: invoice };
  }
}
