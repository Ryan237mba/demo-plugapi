import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Education, EducationDocument } from './entities/education.entity';
import { Model } from 'mongoose';
import { UpdateExperienceDto } from './dto/update-education.dto';

@Injectable()
export class EducationsService {
  constructor(
    @InjectModel(Education.name)
    private readonly educations: Model<EducationDocument>,
  ) {}

  create(dto: CreateEducationDto, user: string) {
    return this.educations.create({ ...dto, user });
  }

  updateOne(_id: string, dto: UpdateExperienceDto) {
    return this.educations
      .findByIdAndUpdate(_id, { $set: dto }, { new: true })
      .orFail()
      .exec();
  }
}
