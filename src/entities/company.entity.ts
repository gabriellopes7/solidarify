import { Column, Entity, OneToOne, ObjectIdColumn, ObjectId } from 'typeorm';
import { UserType } from './userType.enum';
import { User } from './user.entity';

@Entity()
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
  isPrivate: boolean;

  @OneToOne(() => User)
  user: User;

  //TODO
  //   @OneToMany(() => Donations)
  //   donations: Donations[];
}
