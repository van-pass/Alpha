import { ConflictException, Injectable } from '@nestjs/common';

import { ParentsRepository } from './repositories/parents.repository';
import { CreateParentBody } from './dtos/create-parent.dto';

@Injectable()
export class ParentsService {
  constructor(private readonly repository: ParentsRepository) {}

  async register(data: CreateParentBody) {
    const existingParent = await this.repository.getByWhatsapp(data.whatsappNumber);

    if (existingParent) {
      throw new ConflictException('Parent with this whatsapp number already exists.', {
        description: 'PRS-RE01'
      });
    }

    const { id, name, whatsappNumber } = await this.repository.create(data);

    return {
      data: {
        id,
        name,
        whatsappNumber
      }
    };
  }
}
