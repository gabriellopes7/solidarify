import { UserType } from './userType.enum';
import { User } from './user.entity';
import { Photo } from './photo.entity';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class Company {
  // @ObjectIdColumn()
  // id: ObjectId;
  // @Column()
  // fantasyName: string;
  // @Column()
  // legalName: string;
  // @Column()
  // foundationDate: Date;
  // @Column('int')
  // userType: UserType = 1;
  // @Column()
  // contact?: number;
  // @Column()
  // about: string;
  // @Column()
  // isPrivate: boolean;
  // @OneToOne(() => Photo)
  // profilePhoto?: Photo;
  // @Column()
  // userId: string;
  // user: User;
  //TODO
  //   @OneToMany(() => Donations)
  //   donations: Donations[];
}
