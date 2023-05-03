import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Topics {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  question!: string;

  @Column()
  answer!: string;

  @Column()
  test_id!: number;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;
}
