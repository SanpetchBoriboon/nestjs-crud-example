import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tittle: string;

  @Column()
  note: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne((type) => User, (user) => user.notes)
  user: User;
}
