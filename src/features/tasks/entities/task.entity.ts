import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/shared/base-schema';
import { Document, Schema as sc } from 'mongoose';
import { User, UserDocument } from 'src/features/users/entities/user.entity';

@Schema({ timestamps: true })
export class Task extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  budget: number;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  keyworks: string[];

  @Prop()
  skills: string[];

  @Prop({ unique: true })
  slug: string;

  @Prop({ default: true })
  isOpen: boolean;

  @Prop({ type: sc.Types.ObjectId, ref: () => User })
  author: string | sc.Types.ObjectId | UserDocument;

  @Prop({ type: [{ type: sc.Types.ObjectId, ref: () => User }] })
  applications: string[] | sc.Types.ObjectId[] | UserDocument[];

  @Prop()
  applicationsCount: number;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
