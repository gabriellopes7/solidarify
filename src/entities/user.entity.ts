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

  @OneToOne(() => Photo)
  photo?: Photo;
}
