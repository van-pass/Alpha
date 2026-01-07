import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'src/core/prisma/schema.prisma',
  migrations: {
    path: 'src/core/prisma/migrations'
  },
  datasource: {
    url: process.env['DATABASE_URL']
  }
});
