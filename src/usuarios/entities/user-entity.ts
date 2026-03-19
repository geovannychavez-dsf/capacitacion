import { Order } from 'src/order/entities/order-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  email: string;

  @Column()
  emailVerified: boolean;

  @Column('text')
  estatus: string;

  @Column()
  password: string;

  @Column('datetime')
  birthdate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  order: Order[];
}
