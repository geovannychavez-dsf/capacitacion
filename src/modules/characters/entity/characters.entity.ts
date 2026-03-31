import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Characters' })
export class Characters {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 100 })
  @Unique('name', ['name'])
  name: string;

  @Column('text')
  status: string;

  @Column('text')
  species: string;

  @Column()
  gender: string;

  @Column('text')
  type?: string;

  @Column('text')
  image?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
