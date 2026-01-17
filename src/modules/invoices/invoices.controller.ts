import { Body, Controller, Post } from '@nestjs/common';

import { InvoicesService } from './invoices.service';
import { CreateInvoiceBody } from './dtos/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('create')
  async create(@Body() body: CreateInvoiceBody) {
    return await this.invoicesService.create(body);
  }
}
