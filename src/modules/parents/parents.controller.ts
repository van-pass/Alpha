import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ParentsService } from './parents.service';
import { CreateParentBody } from './dtos/create-parent.dto';

import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import type { RequestUserPayload } from 'src/core/auth/interfaces/auth-token.interface';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async create(@Body() body: CreateParentBody, @User() user: RequestUserPayload) {
    return await this.parentsService.register(body, user);
  }
}
