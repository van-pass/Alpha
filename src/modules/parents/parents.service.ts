import { ConflictException, Injectable } from '@nestjs/common';

import { ParentsRepository } from './repositories/parents.repository';
import { CreateParentBody } from './dtos/create-parent.dto';
import { AsaasService } from 'src/core/integrations/asaas/asaas.service';
import { DriversRepository } from '../drivers/repositories/drivers.repository';

@Injectable()
export class ParentsService {
  constructor(
    private readonly repository: ParentsRepository,
    private readonly driversRepository: DriversRepository,
    private readonly asaasService: AsaasService
  ) {}

  async register(data: CreateParentBody) {
    const existingParent = await this.repository.getByWhatsapp(data.whatsappNumber);

    if (existingParent) {
      throw new ConflictException('Parent with this whatsapp number already exists.', {
        description: 'PRS-RE02'
      });
    }

    const existingDriver = await this.driversRepository.getById(data.driverId);

    if (!existingDriver) {
      throw new ConflictException('Driver with this id does not exist.', {
        description: 'PRS-RE01'
      });
    }

    const { driverId, ...parentWithoutDriverId } = data;
    let asaasCustomerId: string;

    const existingAsaasCustomer = await this.asaasService.getCustomer(data.cpf);

    if (!existingAsaasCustomer) {
      const asaasCustomer = await this.asaasService.createCustomer({
        externalReference: `DR_${driverId}`,
        name: data.name,
        cpfCnpj: data.cpf,
        mobilePhone: data.whatsappNumber
      });

      asaasCustomerId = asaasCustomer.id;
    } else {
      asaasCustomerId = existingAsaasCustomer.id;
    }

    const { id, name, whatsappNumber } = await this.repository.create({
      ...parentWithoutDriverId,
      customerId: asaasCustomerId
    });

    return {
      data: {
        id,
        asaasCustomerId,
        name,
        whatsappNumber
      }
    };
  }
}
