import { UserType } from './userType.enum';
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

  // @Prop({ type: Number, required: true })
  // userType: UserType = 2;

  @Prop(Number)
  contact?: number;

  @Prop({ type: Boolean, required: true })
  isPrivate: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  // @Prop()
  // user: User;
  //TODO
  // @OneToMany(() => Donation)
  // donations: Donation[];
}

export const IndividualSchema = SchemaFactory.createForClass(Individual);
