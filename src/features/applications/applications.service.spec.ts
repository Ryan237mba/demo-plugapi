import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from '../tasks/tasks.module';
import { UsersModule } from '../users/users.module';
import { Application, ApplicationSchema } from './entities/application.entity';
import { DbOpts } from 'src/app.module';
import { DB_URL, DB_TYPE } from 'src/common/const';

describe('ApplicationsService', () => {
  let service: ApplicationsService;

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
      providers: [ApplicationsService],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
