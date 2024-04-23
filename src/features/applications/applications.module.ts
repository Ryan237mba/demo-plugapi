import { Module, forwardRef } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {
  ApplicationsController,
  TaskApplicationsController,
} from './applications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './entities/application.entity';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    forwardRef(() => TasksModule),
    UsersModule,
  ],
  controllers: [ApplicationsController, TaskApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
