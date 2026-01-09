import { ConflictException, Injectable } from '@nestjs/common';

import { DriversRepository } from './repositories/drivers.repository';
import { CreateDriverBody } from './dtos/create-driver.dto';
import { encrypt } from 'src/shared/utils/security';

@Injectable()
export class DriversService {
  constructor(private readonly repository: DriversRepository) {}

  async register(data: CreateDriverBody) {
    const existingDriverByEmail = await this.repository.getByEmail(data.email);

    if (existingDriverByEmail?.plate === data.plate) {
      throw new ConflictException('Warning! This plate is already registered.', {
        description: 'DRS-RE03'
      });
    }

    if (existingDriverByEmail) {
      throw new ConflictException('Driver with this email already exists.', {
        description: 'DRS-RE02'
      });
    }

    const existingDriverByWhatsapp = await this.repository.getByWhatsapp(data.whatsappNumber);

    if (existingDriverByWhatsapp) {
      throw new ConflictException('Driver with this whatsapp number already exists.', {
        description: 'DRS-RE01'
      });
    }

    const hashedPassword = await encrypt(data.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...driverWithoutPassword } = await this.repository.create({
      ...data,
      password: hashedPassword
    });

    return { data: driverWithoutPassword };
  }
}
