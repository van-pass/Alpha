import { Body, Controller, Post } from '@nestjs/common';

import { DriversService } from './drivers.service';
import { CreateDriverBody } from './dtos/create-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post('signup')
  async create(@Body() body: CreateDriverBody) {
    return await this.driversService.register(body);
  }
}
