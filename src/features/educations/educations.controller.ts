import { Controller, Post, Body, Req, Get, Patch, Param } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { URequest } from 'src/common/shared/request';
import { BaseController } from 'src/common/shared/base-controller';
import { UsersService } from '../users/users.service';
import { UseJwt } from '../auth/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateExperienceDto } from './dto/update-education.dto';

@Controller({
  version: '1',
  path: 'users/educations',
})
@UseJwt()
@ApiBearerAuth()
@ApiTags('Engineer Educations')
export class EducationsController extends BaseController {
  constructor(
    private readonly educationsService: EducationsService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  @ApiOperation({ summary: 'Add a new education' })
  @Post()
  create(@Body() dto: CreateEducationDto, @Req() { user }: URequest) {
    return this.run(async () => {
      const exp = await this.educationsService.create(dto, user._id);
      await this.usersService.addEducation(user._id, exp._id);
      return exp;
    });
  }

  @ApiOperation({ summary: 'Get user educations' })
  @Get()
  getExperiences(@Req() { user }: URequest) {
    return this.run(async () => {
      return this.usersService.getEducations(user._id);
    });
  }

  @ApiOperation({ summary: 'Update user education' })
  @Patch(':experienceId')
  updateUserExperience(
    @Param('experienceId') experienceId: string,
    @Body() dto: UpdateExperienceDto,
  ) {
    return this.run(() => this.educationsService.updateOne(experienceId, dto));
  }
}
