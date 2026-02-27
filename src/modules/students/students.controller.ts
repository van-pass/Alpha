import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { StudentsService } from './students.service';
import { CreateStudentBody } from './dtos/create-student.dto';

import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import type { RequestUserPayload } from 'src/core/auth/interfaces/auth-token.interface';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async create(@Body() body: CreateStudentBody, @User() user: RequestUserPayload) {
    return await this.studentsService.register(body, user);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async list(@User() user: RequestUserPayload) {
    return await this.studentsService.listAll(user);
  }
}
