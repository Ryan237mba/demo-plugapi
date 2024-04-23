import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController, UsersSkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill } from './entities/skill.entity';
import { SkillSchema } from './entities/skill.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    UsersModule,
  ],
  providers: [SkillsService],
  controllers: [SkillsController, UsersSkillsController],
})
export class SkillsModule {}
