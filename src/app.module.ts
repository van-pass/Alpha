import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './core/prisma/prisma.module';
import { DriversModule } from './modules/drivers/drivers.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, DriversModule]
})
export class AppModule {}
