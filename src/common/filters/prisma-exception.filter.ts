import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    if (exception.code === 'P2002') {
      throw new ConflictException('Duplicate record');
    }
  }
}
