import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './core/auth/auth.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { ParentsModule } from './modules/parents/parents.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { StudentsModule } from './modules/students/students.module';
import { InvoicesModule } from './modules/invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    PrismaModule,
    AuthModule,
    DriversModule,
    ParentsModule,
    SchoolsModule,
    StudentsModule,
    InvoicesModule
  ]
})
export class AppModule {}
