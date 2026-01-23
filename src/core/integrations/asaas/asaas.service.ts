import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

import { AsaasWebhookEvent, PaymentEventBody } from './dtos/webhook-event';
import { InvoicesRepository } from 'src/modules/invoices/repositories/invoices.repository';
import { AsaasErrorResponse } from './interfaces/asaas-errors.interface';
import {
  CreateAsaasCustomerRequest,
  AsaasCustomerResponse,
  ListAsaasCustomersResponse
} from './interfaces/asaas-customer.interface';
import {
  CreateAsaasBillingRequest,
  AsaasBillingResponse
} from './interfaces/asaas-billing.interface';
import { InvoicesStatus } from 'src/core/prisma/generated/enums';

@Injectable()
export class AsaasService {
  constructor(
    private readonly httpService: HttpService,
    private readonly invoicesRepository: InvoicesRepository
  ) {}

  async createCustomer(payload: CreateAsaasCustomerRequest): Promise<AsaasCustomerResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<AsaasCustomerResponse>('/customers', payload)
      );
      return data;
    } catch (error) {
      console.log(error);

      const asaasError = error.response?.data as AsaasErrorResponse;

      throw new BadRequestException(
        asaasError?.errors[0]?.description || 'Unexpected error to create customer in Asaas.'
      );
    }
  }

  async getCustomer(cpf: string): Promise<AsaasCustomerResponse | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ListAsaasCustomersResponse>('/customers', {
          params: {
            cpfCnpj: cpf
          }
        })
      );

      if (data.totalCount > 0) {
        return data.data[0];
      }

      return null;
    } catch (error) {
      console.log(error);

      const asaasError = error.response?.data as AsaasErrorResponse;

      throw new BadRequestException(
        asaasError?.errors[0]?.description || 'Unexpected error to find customer in Asaas.'
      );
    }
  }

  async createInvoice(payload: CreateAsaasBillingRequest): Promise<AsaasBillingResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<AsaasBillingResponse>('/payments', payload)
      );
      return data;
    } catch (error) {
      console.log(error);

      const asaasError = error.response?.data as AsaasErrorResponse;

      throw new BadRequestException(
        asaasError?.errors[0]?.description || 'Unexpected error to create invoice in Asaas.'
      );
    }
  }

  async handlePaymentReceived(data: PaymentEventBody) {
    try {
      if (data.event !== AsaasWebhookEvent.PAYMENT_RECEIVED) {
        return { received: true, ignored: true };
      }
      const result = await this.invoicesRepository.updateStatus(
        data.payment.id,
        InvoicesStatus.PAID
      );

      if (result.count === 0) {
        return {
          received: true,
          message: 'Invoice already PAID or not found'
        };
      }

      return {
        received: true
      };
    } catch (error) {
      console.error('Webhook Error:', error);

      const asaasError = error.response?.data as AsaasErrorResponse;

      throw new BadRequestException(
        asaasError?.errors?.[0]?.description || 'Internal error processing Asaas webhook'
      );
    }
  }
}
