import { User } from './user.entity';
import { Photo } from './photo.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CATEGORY } from '../common/enum/category.enum';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ type: String, required: true })
  fantasyName: string;

  @Prop({ type: String, required: true })
  legalName: string;

  @Prop({ type: Date, required: true })
  foundationDate: Date;

  @Prop({ type: String, required: true, length: 14 })
  legalDocument: string;

  @Prop({ type: Number, required: true })
  contact: number;

  @Prop({ type: String })
  address?: string;

  @Prop({ type: String, required: true })
  about: string;

  @Prop({ type: String, enum: CATEGORY })
  category: CATEGORY;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: String })
  website?: string;

  @Prop({ type: Boolean, required: true })
  validated: boolean;

  @Prop({ type: Date, required: true, default: null })
  createDate: Date;

  @Prop({ type: Date, default: null })
  updateDate: Date;

  //TODO relacionamento com projetos
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  // projects: Project[];

  // @OneToOne(() => Photo)
  // profilePhoto?: Photo;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
