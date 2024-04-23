import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindDto {
  @ApiPropertyOptional()
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;
}
