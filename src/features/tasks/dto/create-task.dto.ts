import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(15)
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(5)
  budget: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsOptional()
  keyworks?: string[];

  @ApiPropertyOptional({ isArray: true })
  @IsArray()
  @IsOptional()
  skills?: string[];
}
