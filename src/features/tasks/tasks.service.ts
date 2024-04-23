import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { Model } from 'mongoose';
import { FindDto } from 'src/common/dto/find.dto';
import { paginate } from 'nestjs-paginate-mongo';
import { UpdateTaskDto } from './dto/update-task.dto';
import { uniqSlug } from 'src/common/helpers';
import { User } from '../users/entities/user.entity';
import { ApplicationsService } from '../applications/applications.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly tasks: Model<TaskDocument>,
    private readonly applicationsService: ApplicationsService,
  ) {}
  create(dto: CreateTaskDto, author: string) {
    return this.tasks.create({
      ...dto,
      author,
      slug: uniqSlug(dto.title),
    });
  }

  findAll(meta?: FindDto) {
    return paginate(
      this.tasks
        .find()
        .populate({
          path: 'author',
          select: User.hidden,
        })
        .sort({ createdAt: 'desc' }),
      meta,
    );
  }

  findOne(_id: string) {
    return this.tasks.findById(_id).populate('author').orFail().exec();
  }

  findBySlug(slug: string) {
    return this.tasks.findOne({ slug }).populate('author').orFail().exec();
  }

  updateOne(_id: string, dto: UpdateTaskDto) {
    return this.tasks
      .findByIdAndUpdate(_id, { $set: dto }, { new: true })
      .populate('author')
      .orFail()
      .exec();
  }

  deleteOne(_id: string) {
    return this.tasks.findByIdAndDelete(_id).populate('author').orFail().exec();
  }

  addApplication(_id: string, application: string) {
    return this.tasks
      .findByIdAndUpdate(
        _id,
        {
          $push: { applications: application },
          $inc: { applicationsCount: 1 },
        },
        { new: true },
      )
      .orFail()
      .exec();
  }

  async getApplications(taskId: string, params?: FindDto) {
    const { applications } = await this.tasks.findById(taskId);
    return this.applicationsService.findIn(applications as string[], params);
  }

  async isAuthor(taskId: string, userId: string) {
    const task = await this.tasks.findById(taskId).orFail().exec();
    return task.author.toString() === userId;
  }
}
