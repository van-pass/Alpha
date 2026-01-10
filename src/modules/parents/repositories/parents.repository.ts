import { Parents } from 'src/core/prisma/generated/client';
import { CreateParentBody } from '../dtos/create-parent.dto';

export type CreateParentProps = Omit<CreateParentBody, 'driverId'> & {
  customerId: string;
};

export abstract class ParentsRepository {
  abstract create(data: CreateParentProps): Promise<Parents>;
  abstract getByWhatsapp(whatsappNumber: string): Promise<Parents | null>;
  abstract getById(id: number): Promise<Parents | null>;
}
