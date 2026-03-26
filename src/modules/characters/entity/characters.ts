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
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @Unique(['name'])
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
