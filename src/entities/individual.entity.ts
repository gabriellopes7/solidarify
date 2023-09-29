import { User } from './user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type IndividualDocument = HydratedDocument<Individual>;

@Schema()
export class Individual {
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Prop({ type: String, required: true, length: 11 })
  document: string;

  // @Prop({ type: Number, required: true })
  // userType: UserType = 2;
  @Prop(Number)
  contact?: number;

  @Prop({ type: Boolean, required: true })
  isPrivate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date, default: null })
  createDate: Date;

  @Prop({ type: Date, required: false, default: null })
  updateDate: Date;
  // @Prop()
  // user: User;
  //TODO
  // @OneToMany(() => Donation)
  // donations: Donation[];
}

export const IndividualSchema = SchemaFactory.createForClass(Individual);
