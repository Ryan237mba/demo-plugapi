import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Health {
  @Prop()
  checkedAt: Date;

  @Prop()
  duration: number;
}

export type HealthDoc = Health & Document;
export const HealthSchema = SchemaFactory.createForClass(Health);
