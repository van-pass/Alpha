import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './core/prisma/prisma.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { ParentsModule } from './modules/parents/parents.module';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    PrismaModule,
    DriversModule,
    ParentsModule,
    StudentsModule
  ]
})
export class AppModule {}
