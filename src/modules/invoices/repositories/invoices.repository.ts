import { Invoices } from 'src/core/prisma/generated/client';

export abstract class InvoicesRepository {
  abstract create(
    data: Omit<Invoices, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<Invoices>;
  abstract updateStatus(
    transactionId: string,
    status: Invoices['status']
  ): Promise<{ count: number }>;
}
