import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { PrismaClient } from './generated/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('[PrismaService] DATABASE_URL not found.');
    }

    const poolInstance = new Pool({ connectionString });

    const adapter = new PrismaPg(poolInstance);

    super({ adapter });

    this.pool = poolInstance;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
