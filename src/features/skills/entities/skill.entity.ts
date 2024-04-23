import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skill {
  @Prop({ unique: true, required: true })
  label: string;
}

export type SkillDocument = Skill & Document;
export const SkillSchema = SchemaFactory.createForClass(Skill);
