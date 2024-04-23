import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateEducationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(3)
  school: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  degree: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  from: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  to: Date;

  @ApiPropertyOptional()
  @IsString()
  @Length(15)
  @IsOptional()
  description?: string;
}
