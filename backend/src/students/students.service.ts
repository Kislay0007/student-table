import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Student } from '@prisma/client';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

const prisma = new PrismaClient();

@Injectable()
export class StudentsService {
  async findAll(): Promise<Student[]> {
    return prisma.student.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: CreateStudentDto): Promise<Student> {
    return prisma.student.create({ data });
  }

  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return prisma.student.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    await prisma.student.delete({ where: { id } });
  }
}
