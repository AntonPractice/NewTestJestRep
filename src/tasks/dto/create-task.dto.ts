import { 
  IsNotEmpty, 
  IsString, 
  IsEnum, 
  IsArray, 
  IsOptional, 
  ValidateNested,
  IsNumber 
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ExampleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  input: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  output: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  explanation?: string;
}

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: ['easy', 'medium', 'hard'] })
  @IsNotEmpty()
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ type: [ExampleDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExampleDto)
  examples?: ExampleDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @ApiProperty({ enum: ['user', 'admin', 'interviewer'] })
  @IsNotEmpty()
  @IsEnum(['user', 'admin', 'interviewer'])
  authorRole: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number;
}