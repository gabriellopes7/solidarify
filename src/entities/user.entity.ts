import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne } from 'typeorm';
import { Photo } from './photo.entity';

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

  @Column()
  contact?: number;

  @Column()
  isPrivate: boolean;

  @OneToOne((type) => Photo)
  photo?: Photo;
}
