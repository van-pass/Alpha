import { Module } from '@nestjs/common';

import { ParentsController } from './parents.controller';
import { ParentsService } from './parents.service';
import { ParentsRepository } from './repositories/parents.repository';
import { PrismaParentsRepository } from './repositories/prisma.parents.repository';
import { AsaasModule } from 'src/core/integrations/asaas/asaas.module';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [AsaasModule, DriversModule],
  controllers: [ParentsController],
  providers: [
    ParentsService,
    {
      provide: ParentsRepository,
      useClass: PrismaParentsRepository
    }
  ],
  exports: [ParentsRepository]
})
export class ParentsModule {}
