import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ParentsService } from './parents.service';
import { CreateParentBody } from './dtos/create-parent.dto';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async create(@Body() body: CreateParentBody) {
    return await this.parentsService.register(body);
  }
}
