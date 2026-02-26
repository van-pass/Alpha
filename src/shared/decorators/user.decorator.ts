import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { RequestUserPayload } from 'src/core/auth/interfaces/auth-token.interface';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest & { user: RequestUserPayload }>();
  return request.user;
});
