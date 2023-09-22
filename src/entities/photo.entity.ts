import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
@Entity()
export class Photo {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @Column()
  url: string;

  @Column()
  size: number;
}
