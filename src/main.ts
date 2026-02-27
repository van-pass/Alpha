import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  const fastify = app.getHttpAdapter().getInstance();

  fastify.get('/', () => {
    return { status: 'ok', uptime: process.uptime() };
  });

  await app.listen({ host: '0.0.0.0', port: 4433 });
}

bootstrap();
