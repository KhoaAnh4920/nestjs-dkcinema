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
import { TypeSeet } from '../type-seet/type-seet.entity';
import { Room } from '../room/room.entity';
@Entity('Seet')
export class Seet {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @Column({
    name: 'name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  codeSeet: string;

  @Column({
    type: 'integer',
    precision: null,
    nullable: true,
  })
  posOfRow: number;

  @Column({
    type: 'integer',
    precision: null,
    nullable: true,
  })
  posOfColumn: number;

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

  @ManyToOne(() => TypeSeet, (typeSeet) => typeSeet.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  typeSeet: TypeSeet;

  @ManyToOne(() => Room, (room) => room.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  room: Room;
}
