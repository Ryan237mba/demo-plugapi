import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as sc } from 'mongoose';
import { User } from 'src/features/users/entities/user.entity';

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ type: Date })
  from: Date;

  @Prop()
  to: string[];

  @Prop()
  description: string;

  @Prop({ type: sc.Types.ObjectId, ref: () => User })
  user: sc.Types.ObjectId | string;
}

export type ExperienceDocument = Experience & Document;
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
