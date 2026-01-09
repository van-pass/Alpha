import { Parents } from 'src/core/prisma/generated/client';
import { CreateParentBody } from '../dtos/create-parent.dto';

export abstract class ParentsRepository {
  abstract create(data: CreateParentBody): Promise<Parents>;
  abstract getByWhatsapp(whatsappNumber: string): Promise<Parents | null>;
  abstract getById(id: number): Promise<Parents | null>;
}
