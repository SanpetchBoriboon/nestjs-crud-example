import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Note } from '../../notes/entities/note.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({
    nullable: false,
    default: () => 'DATE_ADD(NOW(), INTERVAL 2 HOUR)',
    type: 'timestamp',
  })
  create_at: Date;

  @OneToMany((type) => Note, (note) => note.user)
  notes: Note[];
}
