import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeletableMixin } from 'src/common/mixins/deletable.mixin';
import { State } from 'src/common/shared/base-schema';
import { SALT_ROUND } from 'src/common/const';
import { ExperienceDocument } from '../experiences/entities/experience.entity';
import { EducationDocument } from '../educations/entities/education.entity';

@Injectable()
export class UsersService extends DeletableMixin<User> {
  constructor(
    @InjectModel(User.name)
    private readonly users: Model<UserDocument>,
  ) {
    super();
  }

  create(dto: CreateUserDto, role: UserRole) {
    return this.users.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 10),
      role,
    });
  }

  findByEmail(email: string, full = false) {
    return this.users
      .findOne({ email })
      .select(full ? [] : User.hidden)
      .exec();
  }

  findByPhone(phone: string) {
    return this.users.findOne({ phone }).select(User.hidden).exec();
  }

  findOne(_id: string) {
    return this.users.findById(_id).select(User.hidden).orFail().exec();
  }

  find(states = [State.active]) {
    return this.users
      .find()
      .where('state')
      .in(states)
      .select(User.hidden)
      .exec();
  }

  findAll() {
    return this.users.find();
  }

  async update(_id: string, dto: UpdateUserDto) {
    return await this.users
      .findByIdAndUpdate(_id, { $set: dto }, { new: true })
      .select(User.hidden)
      .orFail()
      .exec();
  }

  resetPassword(email: string, password: string) {
    return this.users
      .findOneAndUpdate(
        { email },
        { $set: { password: bcrypt.hashSync(password, SALT_ROUND) } },
        { new: true },
      )
      .select(User.hidden)
      .orFail()
      .exec();
  }

  confirmEmail(id: string) {
    return this.users
      .findByIdAndUpdate(
        id,
        { $set: { emailVerifiedAt: Date.now() } },
        { new: true },
      )
      .select(User.hidden)
      .orFail()
      .exec();
  }

  addExperience(_id: string, exp: string) {
    return this.users
      .findByIdAndUpdate(_id, { $push: { experiences: exp } }, { new: true })
      .select(User.hidden)
      .orFail()
      .exec();
  }

  async getExperiences(_id: string): Promise<ExperienceDocument[]> {
    return (
      await this.users
        .findById(_id)
        .select('experiences')
        .populate('experiences')
        .orFail()
        .exec()
    ).experiences as ExperienceDocument[];
  }

  addEducation(_id: string, exp: string) {
    return this.users
      .findByIdAndUpdate(_id, { $push: { educations: exp } }, { new: true })
      .select(User.hidden)
      .orFail()
      .exec();
  }

  async getEducations(_id: string): Promise<EducationDocument[]> {
    return (
      await this.users
        .findById(_id)
        .select('educations')
        .populate('educations')
        .orFail()
        .exec()
    ).educations as EducationDocument[];
  }

  async getSkills(_id: string) {
    return (await this.users.findById(_id).orFail().exec()).topSkills;
  }

  async addSkills(_id: string, skills: string[]) {
    const _skills = await this.getSkills(_id);

    // Check if user has already added 10 skills
    if (_skills.length + skills.length > 10) {
      throw new BadRequestException('REACHED_MAX_SKILLS');
    }

    // Check if the skill has already been added
    skills.forEach((skill) => {
      if (_skills.includes(skill)) {
        throw new BadRequestException(`Skill "${skill}" already exists`);
      }
    });

    return this.users
      .findByIdAndUpdate(
        _id,
        { $push: { topSkills: { $each: skills } } },
        { new: true },
      )
      .select(User.hidden)
      .orFail()
      .exec();
  }

  async removeSkill(_id: string, skill: string) {
    return this.users
      .findByIdAndUpdate(_id, { $pull: { topSkills: skill } }, { new: true })
      .select(User.hidden)
      .orFail()
      .exec();
  }

  async getApplications(_id: string): Promise<string[]> {
    const { applications } = await this.users.findById(_id);
    return applications as string[];
  }

  addApplication(userId: string, applicationId: string) {
    return this.users
      .findByIdAndUpdate(
        userId,
        {
          $push: { applications: applicationId },
          $inc: { applicationsCount: 1 },
        },
        { new: true },
      )
      .orFail()
      .exec();
  }
}
