import { User } from 'src/usuarios/entities/user-entity';
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
