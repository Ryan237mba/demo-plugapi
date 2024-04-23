import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/shared/base-schema';
import { User, UserDocument } from 'src/features/users/entities/user.entity';
import { Document as doc, Schema as sc } from 'mongoose';
import { Task, TaskDocument } from 'src/features/tasks/entities/task.entity';

@Schema({ timestamps: true })
export class Application extends BaseSchema {
  @Prop({ type: sc.Types.ObjectId, ref: () => User })
  applicant: UserDocument | string | sc.Types.ObjectId;

  @Prop({ type: sc.Types.ObjectId, ref: () => Task })
  task: TaskDocument | string | sc.Types.ObjectId;
}

export type ApplicationDocument = Application & doc;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
