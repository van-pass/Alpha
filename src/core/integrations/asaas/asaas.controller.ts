import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AsaasService } from './asaas.service';
import { PaymentEventBody } from './dtos/webhook-event';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';

@Controller('webhook/asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @UseGuards(AuthGuard)
  @Post('payment/received')
  async create(@Body() body: PaymentEventBody) {
    return await this.asaasService.handlePaymentReceived(body);
  }
}
