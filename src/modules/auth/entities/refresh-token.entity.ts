import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'RefreshTokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  tokenHash: string;

  @Column()
  userId: number;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
