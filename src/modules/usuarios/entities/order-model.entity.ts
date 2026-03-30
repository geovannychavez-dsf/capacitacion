import {
  Column,
  CreateDateColumn,
  Double,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user-model.entity';

@Entity({ name: 'Order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  description: string;

  @Column('float')
  valor: Double;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.order)
  @JoinColumn({ name: 'authorId' })
  user: User;

  @Column()
  authorId: number;
}
