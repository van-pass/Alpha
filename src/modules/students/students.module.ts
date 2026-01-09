import { Module } from '@nestjs/common';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentsRepository } from './repositories/students.repository';
import { PrismaStudentsRepository } from './repositories/prisma.students.repository';
import { DriversModule } from '../drivers/drivers.module';

@Module({
  imports: [DriversModule],
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
