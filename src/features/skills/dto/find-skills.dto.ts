import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindDto } from 'src/common/dto/find.dto';

export class FindSkillsDto extends FindDto {
  @ApiPropertyOptional()
  exclude?: string[];
}
