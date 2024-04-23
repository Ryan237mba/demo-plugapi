import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { Application, ApplicationSchema } from './entities/application.entity';
import { DbOpts } from 'src/app.module';
import { DB_URL, DB_TYPE } from 'src/common/const';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(DB_URL, DB_TYPE === 'cert' ? DbOpts : {}),
        MongooseModule.forFeature([
          { name: Application.name, schema: ApplicationSchema },
        ]),
        TasksModule,
        UsersModule,
      ],
      controllers: [ApplicationsController],
      providers: [ApplicationsService],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
