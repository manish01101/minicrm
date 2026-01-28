import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    description: 'Updated name of the customer',
    example: 'Jane Doe',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated email address of the customer',
    example: 'janedoe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Updated phone number of the customer',
    example: '+9876543210',
  })
  @IsOptional()
  phone?: string;
}
