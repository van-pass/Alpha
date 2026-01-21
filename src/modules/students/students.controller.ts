import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { StudentsService } from './students.service';
import { CreateStudentBody } from './dtos/create-student.dto';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard)
  @Post('register')
  async create(@Body() body: CreateStudentBody) {
    return await this.studentsService.register(body);
  }
}
