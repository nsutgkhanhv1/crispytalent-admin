import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Results {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score!: number;

  @Column()
  note!: string;

  @Column()
  user_email: string;

  @Column()
  test_name!: string;

  @Column()
  assessment_name!: string;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;
}
