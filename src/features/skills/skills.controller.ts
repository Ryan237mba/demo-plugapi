import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { BaseController } from 'src/common/shared/base-controller';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UseJwt } from '../auth/auth.decorator';
import { URequest } from 'src/common/shared/request';
import { AddSkillDto } from './dto/add-skill.dto';
import { UsersService } from '../users/users.service';
import { FindSkillsDto } from './dto/find-skills.dto';

@Controller({
  version: '1',
  path: 'skills',
})
@ApiTags('Engineer Skills')
export class SkillsController extends BaseController {
  constructor(private readonly skillsService: SkillsService) {
    super();
  }

  @ApiOperation({ summary: 'Create a new skill' })
  @Post()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.run(() => this.skillsService.create(dto));
  }

  @ApiOperation({ summary: 'Autocomplete skill while typing' })
  @Get('autocomplete')
  autocompleteSkills(@Query('query') query: string) {
    return this.run(() => this.skillsService.search(query));
  }

  @ApiOperation({ summary: 'Skills list' })
  @Get()
  findAllSkills(@Query() { exclude, perPage: _pp, page: _p }: FindSkillsDto) {
    return this.run(() =>
      this.skillsService.findAll(exclude, {
        perPage: _pp ? parseInt(`${_pp}`) : 25, // needs refactor
        page: _p ? parseInt(`${_p}`) : undefined,
      }),
    );
  }
}

@Controller({
  version: '1',
  path: 'users/skills',
})
@ApiTags('Engineer Skills')
export class UsersSkillsController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @ApiOperation({ summary: 'List user skills' })
  @ApiBearerAuth()
  @UseJwt()
  @Get()
  getUserSkills(@Req() { user }: URequest) {
    return this.run(() => {
      return this.usersService.getSkills(user._id);
    });
  }

  @ApiOperation({ summary: 'Add skills to a profile' })
  @ApiBearerAuth()
  @UseJwt()
  @Post()
  addSkills(@Body() { skills }: AddSkillDto, @Req() { user }: URequest) {
    return this.run(() => {
      return this.usersService.addSkills(user._id, skills);
    });
  }

  @ApiOperation({ summary: 'Remove skill to a profile' })
  @ApiBearerAuth()
  @UseJwt()
  @Delete(':skill')
  removeSkill(@Param('skill') skill: string, @Req() { user }: URequest) {
    return this.run(() => {
      return this.usersService.removeSkill(user._id, skill);
    });
  }
}
