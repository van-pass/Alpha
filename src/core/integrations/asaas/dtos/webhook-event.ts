import { IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import type { AsaasBillingResponse } from '../interfaces/asaas-billing.interface';

export enum AsaasWebhookEvent {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  PAYMENT_DELETED = 'PAYMENT_DELETED'
}

export class PaymentEventBody {
  @IsString()
  id: string;

  @IsEnum(AsaasWebhookEvent)
  event: AsaasWebhookEvent;

  @IsString()
  @IsNotEmpty()
  dateCreated: string;

  @IsObject()
  @ValidateNested()
  payment: AsaasBillingResponse;
}
