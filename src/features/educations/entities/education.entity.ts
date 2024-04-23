import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as sc } from 'mongoose';
import { User } from 'src/features/users/entities/user.entity';

@Schema({ timestamps: true })
export class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ type: Date, required: true })
  from: Date;

  @Prop({ type: Date })
  to: Date;

  @Prop()
  description: string;

  @Prop({ type: sc.Types.ObjectId, ref: () => User })
  user: sc.Types.ObjectId | string;
}

export type EducationDocument = Education & Document;
export const EducationSchema = SchemaFactory.createForClass(Education);
