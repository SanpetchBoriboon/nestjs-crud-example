import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tittle: string;

  @Column()
  note: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne((type) => User, (user) => user.notes)
  user: User;
}
