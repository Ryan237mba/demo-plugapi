import { Prop, Schema } from '@nestjs/mongoose';
import { IDeletable } from '../mixins/deletable.mixin';

export enum State {
  trashed = 'trashed',
  deleted = 'deleted',
  active = 'active',
  archived = 'archived',
}
@Schema()
export class BaseSchema implements IDeletable {
  @Prop({ enum: State, default: State.active })
  state: State;

  @Prop()
  deletedAt: Date;

  @Prop()
  archivedAt: Date;

  @Prop()
  trashedAt: Date;
}
