import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './repositories/students.repository';
import { PrismaStudentsRepository } from './repositories/prisma.students.repository';
import { DriversModule } from '../drivers/drivers.module';
import { ParentsModule } from '../parents/parents.module';

@Module({
  imports: [DriversModule, ParentsModule],
  controllers: [StudentsController],
  providers: [
    StudentsService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository
    }
  ]
})
export class StudentsModule {}
