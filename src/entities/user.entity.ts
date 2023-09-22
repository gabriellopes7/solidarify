import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne } from 'typeorm';
import { Photo } from './photo.entity';
import { UserType } from './userType.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('email')
  email: string;

  @Column()
  password: string;

  @Column({ type: 'boolean', nullable: false, select: false, default: true })
  isActive: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column('int')
  userType: UserType;

  @Column()
  contact?: number;

  @Column()
  isPrivate: boolean;

  @OneToOne(() => Photo)
  photo?: Photo;
}
