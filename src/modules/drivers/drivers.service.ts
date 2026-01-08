import { ConflictException, Injectable } from '@nestjs/common';

import { DriversRepository } from './repositories/drivers.repository';
import { CreateDriverBody } from './dtos/create-driver.dto';
import { encrypt } from 'src/shared/utils/security';

@Injectable()
export class DriversService {
  constructor(private readonly repository: DriversRepository) {}

  async register(data: CreateDriverBody) {
    const existingDriver = await this.repository.getByEmail(data.email);

    if (existingDriver?.plate === data.plate) {
      throw new ConflictException('Warning! This plate is already registered.', {
        description: 'DRS-RE02'
      });
    }

    if (existingDriver) {
      throw new ConflictException('Driver already exists.', {
        description: 'DRS-RE01'
      });
    }

    const hashedPassword = await encrypt(data.password);

    const driver = await this.repository.create({
      ...data,
      password: hashedPassword
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...payload } = driver;

    return payload;
  }
}
