import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Seet } from '../seet/seet.entity';
@Entity('TypeSeet')
export class TypeSeet {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Name of seet is required' })
  @MinLength(2)
  @MaxLength(255)
  @Column({
    name: 'name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @Column({
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: string;

  @OneToMany(() => Seet, (item) => item.typeSeet)
  seets: Seet[];
}
