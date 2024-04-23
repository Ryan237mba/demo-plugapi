import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseJwt } from '../auth/auth.decorator';
import { URequest } from 'src/common/shared/request';
import { BaseController } from 'src/common/shared/base-controller';
import { TasksService } from '../tasks/tasks.service';
import { UsersService } from '../users/users.service';
import { FindDto } from 'src/common/dto/find.dto';

@Controller({
  version: '1',
  path: 'applications',
})
@ApiTags('Applications')
@ApiBearerAuth()
@UseJwt()
export class ApplicationsController extends BaseController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  @Get()
  findAll(@Req() { user }: URequest, @Query() q: FindDto) {
    return this.run(async () => {
      const ids = await this.usersService.getApplications(user._id);
      return this.applicationsService.findIn(ids, q);
    });
  }

  @Get(':applicationId')
  findOne(@Param('applicationId') applicationId: string) {
    return this.run(() => {
      return this.applicationsService.findOne(applicationId);
    });
  }
}

@Controller({
  version: '1',
  path: 'task/:taskId/applications',
})
@ApiTags('Applications')
@ApiBearerAuth()
@UseJwt()
export class TaskApplicationsController extends BaseController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  @Post()
  apply(@Param('taskId') taskId: string, @Req() { user }: URequest) {
    return this.run(async () => {
      const userId = user._id;
      const application = await this.applicationsService.create(taskId, userId);
      await this.tasksService.addApplication(taskId, application._id);
      await this.usersService.addApplication(userId, application._id);
      return application;
    });
  }

  @Get()
  findAll(
    @Param('taskId') taskId: string,
    @Req() { user }: URequest,
    @Query() q: FindDto,
  ) {
    return this.run(async () => {
      if (!(await this.tasksService.isAuthor(taskId, user._id))) {
        throw new ForbiddenException('MUST_BE_AUTHOR');
      }
      return this.tasksService.getApplications(taskId, q);
    });
  }
}
