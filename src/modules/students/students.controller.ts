import { Body, Controller, Post } from '@nestjs/common';

import { StudentsService } from './students.service';
import { CreateStudentBody } from './dtos/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('register')
  async create(@Body() body: CreateStudentBody) {
    return await this.studentsService.register(body);
  }
}
