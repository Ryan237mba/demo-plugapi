import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Experience, ExperienceDocument } from './entities/experience.entity';
import { Model } from 'mongoose';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name)
    private readonly experiences: Model<ExperienceDocument>,
  ) {}

  create(dto: CreateExperienceDto, user: string) {
    return this.experiences.create({ ...dto, user });
  }

  updateOne(_id: string, dto: UpdateExperienceDto) {
    return this.experiences
      .findByIdAndUpdate(_id, { $set: dto }, { new: true })
      .orFail()
      .exec();
  }
}
