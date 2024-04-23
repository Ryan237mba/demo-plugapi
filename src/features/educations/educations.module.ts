import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from './entities/education.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Education.name, schema: EducationSchema },
    ]),
    UsersModule,
  ],
  controllers: [EducationsController],
  providers: [EducationsService],
})
export class EducationsModule {}
