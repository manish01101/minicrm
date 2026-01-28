import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Role } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const employee = await this.prisma.user.findUnique({ where: { id: dto.assignedTo } });
    if (!employee || employee.role !== Role.EMPLOYEE) {
      throw new NotFoundException('Assigned user not found or not an EMPLOYEE');
    }

    const customer = await this.prisma.customer.findUnique({ where: { id: dto.customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status || 'PENDING',
        assignedToId: dto.assignedTo,
        customerId: dto.customerId,
      },
    });
  }

  async findAll(user: { id: number; role: Role }) {
    if (user.role === Role.ADMIN) {
      return this.prisma.task.findMany({
        include: { assignedTo: true, customer: true },
      });
    } else {
      // EMPLOYEE sees only their tasks
      return this.prisma.task.findMany({
        where: { assignedToId: user.id },
        include: { assignedTo: true, customer: true },
      });
    }
  }

  async updateStatus(taskId: number, user: { id: number; role: Role }, dto: UpdateTaskStatusDto) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    if (user.role === Role.EMPLOYEE && task.assignedToId !== user.id) {
      throw new ForbiddenException('You cannot update tasks assigned to other employees');
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: dto.status },
    });
  }
}
