import { ConflictException, Injectable } from '@nestjs/common';

import { CreateSchoolBody } from './dtos/create-school.dto';
import { SchoolsRepository } from './repositories/schools.repository';

@Injectable()
export class SchoolsService {
  constructor(private readonly repository: SchoolsRepository) {}

  async register(data: CreateSchoolBody) {
    const existingSchool = await this.repository.getByWhatsapp(data.whatsappNumber);

    if (existingSchool) {
      throw new ConflictException('School with this whatsapp number already exists.', {
        description: 'SCS-RE01'
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
