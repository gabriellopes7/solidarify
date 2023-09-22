import { Column, Entity, OneToOne, ObjectIdColumn, ObjectId } from 'typeorm';
import { UserType } from './userType.enum';
import { User } from './user.entity';

@Entity()
export class Individual {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column('int')
  userType: UserType = 2;

  @Column()
  contact?: number;

  @Column()
  isPrivate: boolean;

  @OneToOne(() => User)
  user: User;

  //TODO
  //   @OneToMany(() => Donation)
  //   donations: Donation[];
}
