import { PartialType } from '@nestjs/swagger';
import { CreateEducationDto } from './create-education.dto';

export class UpdateExperienceDto extends PartialType(CreateEducationDto) {}
