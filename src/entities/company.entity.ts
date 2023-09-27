import {
  Column,
  Entity,
  OneToOne,
  ObjectIdColumn,
  ObjectId,
  JoinColumn,
} from 'typeorm';
import { UserType } from './userType.enum';
import { User } from './user.entity';
import { Photo } from './photo.entity';

@Entity('company')
export class Company {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  fantasyName: string;

  @Column()
  legalName: string;

  @Column()
  foundationDate: Date;

  @Column('int')
  userType: UserType = 1;

  @Column()
  contact?: number;

  @Column()
  about: string;

  @Column()
  isPrivate: boolean;

  @OneToOne(() => Photo)
  profilePhoto?: Photo;

  @Column()
  userId: string;

  user: User;

  //TODO
  //   @OneToMany(() => Donations)
  //   donations: Donations[];
}
