import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create tasks.',
  })
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @ApiOperation({ summary: 'Get all tasks for a user' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll(@GetUser() user: { id: number; role: Role }) {
    return this.tasksService.findAll(user);
  }

  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({
    status: 200,
    description: 'Task status updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. User not authorized to update task.',
  })
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: { id: number; role: Role },
    @Body() dto: UpdateTaskStatusDto,
  ) {
    return this.tasksService.updateStatus(+id, user, dto);
  }
}
