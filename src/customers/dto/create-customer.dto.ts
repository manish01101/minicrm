import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Name of the customer', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+1234567890',
  })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    description: 'Company name of the customer',
    example: 'Acme Corp',
  })
  @IsOptional()
  @IsString()
  company?: string;
}
