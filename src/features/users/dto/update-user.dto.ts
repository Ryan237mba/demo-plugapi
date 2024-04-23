import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(2, 2, { message: 'country must be a valid 2 chars country code' })
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  contryState?: string;

  @ApiPropertyOptional()
  @IsOptional()
  postalCode?: string;
}
