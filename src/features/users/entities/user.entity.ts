import { BaseSchema } from 'src/common/shared/base-schema';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as sc } from 'mongoose';
import { ExperienceDocument } from 'src/features/experiences/entities/experience.entity';
import { EducationDocument } from 'src/features/educations/entities/education.entity';
import { ApplicationDocument } from 'src/features/applications/entities/application.entity';

export enum UserRole {
  engineer = 'engineer',
  client = 'client',
}

export enum AccountProvider {
  google = 'google',
  linkedin = 'linkedin',
  local = 'local',
}

@Schema({ timestamps: true })
export class User extends BaseSchema {
  static hidden = ['-applications', '-password', '-experiences', '-educations'];

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  title: string;

  @Prop()
  topSkills: string[];

  @Prop()
  profilePicture: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true })
  phone: string;

  @Prop({ enum: UserRole })
  role: UserRole;

  @Prop({ type: Date })
  phoneVerifiedAt: Date;

  @Prop({ type: Date })
  emailVerifiedAt: Date;

  @Prop({ enum: AccountProvider, default: AccountProvider.local })
  provider: AccountProvider;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  countryState: string;

  @Prop()
  address: string;

  @Prop()
  postalCode: string;

  @Prop({ type: [{ type: sc.Types.ObjectId, ref: () => 'Experience' }] })
  experiences: string[] | sc.Types.ObjectId[] | ExperienceDocument[];

  @Prop({ type: [{ type: sc.Types.ObjectId, ref: () => 'Education' }] })
  educations: string[] | sc.Types.ObjectId[] | EducationDocument[];

  @Prop({ type: [{ type: sc.Types.ObjectId, ref: () => 'Application' }] })
  applications: string[] | sc.Types.ObjectId[] | ApplicationDocument[];

  @Prop({ default: 0 })
  applicationsCount: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
