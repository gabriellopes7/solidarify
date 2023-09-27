import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne } from 'typeorm';
import { Photo } from './photo.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Individual } from './individual.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop(Boolean)
  isActive: boolean;

  // // @OneToOne(() => Photo)
  // photo?: Photo;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Individual' })
  Individual: Individual;

  @Prop(String)
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
