import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: 'The email of the member',
    example: 'test@example.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'The name of the member', example: 'mohamed' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'The title of the member', example: 'Mr' })
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The age of the member', example: 24 })
  @IsNotEmpty({ message: 'Age is required' })
  age: number;

  @ApiProperty({
    description: 'The mobile number of the member',
    example: '1234567890',
  })
  @IsNotEmpty({ message: 'Mobile number is required' })
  mobileNumber: string;
}
