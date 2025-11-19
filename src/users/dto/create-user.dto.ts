import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['user', 'admin', 'interviewer'] })
  @IsOptional()
  @IsEnum(['user', 'admin', 'interviewer'])
  role?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number;
}