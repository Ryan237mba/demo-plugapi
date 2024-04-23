import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModuleOptions, MongooseModule } from '@nestjs/mongoose';
import { DB_CERT, DB_URL, DB_TYPE } from './common/const';
import { CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { HealthModule } from './features/_health/health.module';
import { ExperienceModule } from './features/experiences/experience.module';
import { EducationsModule } from './features/educations/educations.module';
import { SkillsModule } from './features/skills/skills.module';
import { TasksModule } from './features/tasks/tasks.module';
import { ApplicationsModule } from './features/applications/applications.module';

const features = [
  HealthModule,
  AuthModule,
  UsersModule,
  ExperienceModule,
  EducationsModule,
  SkillsModule,
  TasksModule,
  ApplicationsModule,
];

export const DbOpts: MongooseModuleOptions = {
  ssl: true,
  sslValidate: true,
  sslCert: DB_CERT,
  sslKey: DB_CERT,
  authMechanism: 'MONGODB-X509',
};

@Module({
  imports: [
    CacheModule.register(),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(DB_URL, DB_TYPE === 'cert' ? DbOpts : {}),
    ...features,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
