import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('alumni')
export class Alumni {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  graduationYear: string;

  @Column({ nullable: true })
  currentPosition: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
