import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TaskDocument = Task & Document;

class Example {
  @Prop({ required: true })
  input: string;

  @Prop({ required: true })
  output: string;

  @Prop()
  explanation: string;
}

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    required: true,
    enum: ['easy', 'medium', 'hard']
  })
  difficulty: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [Object], default: [] })
  examples: Example[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  authorId: User;

  @Prop({ 
    required: true,
    enum: ['user', 'admin', 'interviewer']
  })
  authorRole: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);