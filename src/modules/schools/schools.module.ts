import { Module } from '@nestjs/common';

import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { SchoolsRepository } from './repositories/schools.repository';
import { PrismaSchoolsRepository } from './repositories/prisma.schools.repository';

@Module({
  controllers: [SchoolsController],
  providers: [
    SchoolsService,
    {
      provide: SchoolsRepository,
      useClass: PrismaSchoolsRepository
    }
  ],
  exports: [SchoolsRepository]
})
export class SchoolsModule {}
