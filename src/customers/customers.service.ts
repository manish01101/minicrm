import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    try {
      return this.prisma.customer.create({
        data: {
          ...dto,
          phone: dto.phone || '',
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email or phone already exists');
      }
      throw error;
    }
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    let where = {};

    if (search) {
      where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.customer.findMany({ where, skip, take: limit }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      data,
      page,
      limit,
      totalRecords: total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
