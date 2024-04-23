import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './entities/skill.entity';
import { Model } from 'mongoose';
import { SkillDocument } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { PaginationOptions, paginate } from 'nestjs-paginate-mongo';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private readonly skills: Model<SkillDocument>,
  ) {}

  create(dto: CreateSkillDto) {
    return this.skills.create(dto);
  }

  search(query: string) {
    return this.skills
      .find()
      .where('label')
      .regex(new RegExp(query, 'i'))
      .limit(10)
      .exec();
  }

  findAll(exclude?: string[], opts?: PaginationOptions) {
    return paginate(this.skills.find().where('label').nin(exclude), opts);
  }
}
