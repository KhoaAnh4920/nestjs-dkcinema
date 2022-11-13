import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from '../users/user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Name is required' })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Exclude()
  @Column({
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @Exclude()
  @Column({
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
