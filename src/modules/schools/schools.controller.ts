import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { SchoolsService } from './schools.service';
import { CreateSchoolBody } from './dtos/create-school.dto';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async create(@Body() body: CreateSchoolBody) {
    return await this.schoolsService.register(body);
  }
}
