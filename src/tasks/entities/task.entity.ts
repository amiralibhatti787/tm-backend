// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Document<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
