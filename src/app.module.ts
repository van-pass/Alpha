import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './core/prisma/prisma.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { StudentsModule } from './modules/students/students.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, DriversModule, StudentsModule]
})
export class AppModule {}
