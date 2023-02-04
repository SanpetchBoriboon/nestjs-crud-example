import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn({
    nullable: false,
    default: () => 'DATE_ADD(NOW(), INTERVAL 2 HOUR)',
    type: 'timestamp',
  })
  create_at: Date;

  @UpdateDateColumn({
    nullable: false,
    default: () => 'DATE_ADD(NOW(), INTERVAL 2 HOUR)',
    type: 'timestamp',
  })
  update_at: Date;

  @ManyToOne((type) => User, (user) => user.notes)
  user: User;
}
