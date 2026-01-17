import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

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

@Injectable()
export class AsaasService {
  constructor(private readonly httpService: HttpService) {}

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
}
