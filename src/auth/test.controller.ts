import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RolesGuard } from './guards/roles.guard'
import { Roles } from './decorators/roles.decorator'
import { Role } from '@prisma/client'

@Controller('test')
export class TestController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin-only')
  adminOnly() {
    return { message: 'Hello Admin!' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('any-user')
  anyUser() {
    return { message: 'Hello Authenticated User!' }
  }
}
