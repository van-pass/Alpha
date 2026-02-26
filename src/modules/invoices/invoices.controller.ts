import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { InvoicesService } from './invoices.service';
import { CreateInvoiceBody } from './dtos/create-invoice.dto';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import type { RequestUserPayload } from 'src/core/auth/interfaces/auth-token.interface';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateInvoiceBody, @User() user: RequestUserPayload) {
    return await this.invoicesService.create(body, user);
  }
}
