import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class AddSkillDto {
  @ApiProperty({ isArray: true })
  @IsArray()
  @IsNotEmpty()
  skills: string[];
}
