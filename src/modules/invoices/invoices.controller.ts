import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { InvoicesService } from './invoices.service';
import { CreateInvoiceBody } from './dtos/create-invoice.dto';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateInvoiceBody) {
    return await this.invoicesService.create(body);
  }
}
