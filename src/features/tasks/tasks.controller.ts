import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseJwt } from '../auth/auth.decorator';
import { URequest } from 'src/common/shared/request';
import { UserRole } from '../users/entities/user.entity';
import { BaseController } from 'src/common/shared/base-controller';
import { FindDto } from 'src/common/dto/find.dto';

@Controller({
  version: '1',
  path: 'tasks',
})
@ApiTags('Tasks')
export class TasksController extends BaseController {
  constructor(private readonly tasksService: TasksService) {
    super();
  }

  @ApiBearerAuth()
  @UseJwt()
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() { user }: URequest) {
    return this.run(() => {
      if (user.role !== UserRole.client) throw new ForbiddenException();
      return this.tasksService.create(createTaskDto, user._id);
    });
  }

  @Get()
  findAll(@Query() query: FindDto) {
    return this.run(() => {
      return this.tasksService.findAll(query);
    });
  }

  @Get('id/:taskId')
  findOne(@Param('taskId') taskId: string) {
    return this.run(() => {
      return this.tasksService.findOne(taskId);
    });
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.run(() => {
      return this.tasksService.findBySlug(slug);
    });
  }

  @ApiBearerAuth()
  @UseJwt()
  @Patch(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    this.run(() => {
      return this.tasksService.updateOne(taskId, updateTaskDto);
    });
  }

  @ApiBearerAuth()
  @UseJwt()
  @Delete(':taskId')
  remove(@Param('taskId') taskId: string) {
    return this.run(() => {
      return this.tasksService.deleteOne(taskId);
    });
  }
}
