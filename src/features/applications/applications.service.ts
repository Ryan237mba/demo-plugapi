import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Application,
  ApplicationDocument,
} from './entities/application.entity';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { paginate } from 'nestjs-paginate-mongo';
import { FindDto } from 'src/common/dto/find.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private readonly applications: Model<ApplicationDocument>,
  ) {}

  create(task: string, applicant: string) {
    return this.applications.create({ task, applicant });
  }

  findOne(_id: string) {
    return this.applications.findById(_id).orFail().exec();
  }

  findIn(ids: string[], params?: FindDto) {
    return paginate(
      this.applications
        .find()
        .where('_id')
        .in(ids)
        .populate([{ path: 'applicant', select: User.hidden }]),
      params,
    );
  }
}
