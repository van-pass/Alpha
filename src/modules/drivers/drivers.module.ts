import { Module } from '@nestjs/common';

import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { DriversRepository } from './repositories/drivers.repository';
import { PrismaDriversRepository } from './repositories/prisma.drivers.repository';

@Module({
  controllers: [DriversController],
  providers: [
    DriversService,
    {
      provide: DriversRepository,
      useClass: PrismaDriversRepository
    }
  ],
  exports: [DriversRepository]
})
export class DriversModule {}
