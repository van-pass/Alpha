import { Body, Controller, Post } from '@nestjs/common';

import { ParentsService } from './parents.service';
import { CreateParentBody } from './dtos/create-parent.dto';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post('register')
  async create(@Body() body: CreateParentBody) {
    return await this.parentsService.register(body);
  }
}
