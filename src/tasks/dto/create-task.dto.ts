import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsInt()
  assignedTo: number; // userId of EMPLOYEE

  @IsInt()
  customerId: number;
}
