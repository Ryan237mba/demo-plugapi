import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  to: Date;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  skills?: string[];

  @ApiPropertyOptional()
  @IsString()
  @Length(15)
  @IsOptional()
  description?: string;
}
