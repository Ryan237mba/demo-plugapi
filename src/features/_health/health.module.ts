import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Health, HealthSchema } from './entities/health.entity';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Health.name, schema: HealthSchema }]),
  ],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
