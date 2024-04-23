import { Controller, Post, Body, Req, Get, Patch, Param } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { URequest } from 'src/common/shared/request';
import { BaseController } from 'src/common/shared/base-controller';
import { UsersService } from '../users/users.service';
import { UseJwt } from '../auth/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller({
  version: '1',
  path: 'users/experienceS',
})
@UseJwt()
@ApiBearerAuth()
@ApiTags('Engineer Experiences')
export class ExperienceController extends BaseController {
  constructor(
    private readonly experienceService: ExperienceService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  @ApiOperation({ summary: 'Add a new experience' })
  @Post()
  create(@Body() dto: CreateExperienceDto, @Req() { user }: URequest) {
    return this.run(async () => {
      const exp = await this.experienceService.create(dto, user._id);
      await this.usersService.addExperience(user._id, exp._id);
      return exp;
    });
  }

  @ApiOperation({ summary: 'Get user experiences' })
  @Get()
  getExperiences(@Req() { user }: URequest) {
    return this.run(async () => {
      return this.usersService.getExperiences(user._id);
    });
  }

  @ApiOperation({ summary: 'Update user experience' })
  @Patch(':experienceId')
  updateUserExperience(
    @Param('experienceId') experienceId: string,
    @Body() dto: UpdateExperienceDto,
  ) {
    return this.run(() => this.experienceService.updateOne(experienceId, dto));
  }
}
