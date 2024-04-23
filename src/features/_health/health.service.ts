import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Health, HealthDoc } from './entities/health.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(Health.name) private readonly healths: Model<HealthDoc>,
  ) {}

  async check() {
    const start = Date.now();
    const health = await this.healths.create({
      checkedAt: start,
    });
    return this.healths.findByIdAndUpdate(
      health.id,
      { $set: { duration: Date.now() - start } },
      { new: true },
    );
  }
}
