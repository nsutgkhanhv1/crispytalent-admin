import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Assessments {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  user_id!: number;

  @Column()
  status!: boolean;

  @Column()
  job_function!: string;

  @Column()
  job_position!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;
}
