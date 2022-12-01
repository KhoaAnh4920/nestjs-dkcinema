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
import { Exclude } from 'class-transformer';
import { Room } from '../room/room.entity';

@Entity('Movietheater')
export class Movietheater {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: "Movietheater's name is required" })
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
    type: 'integer',
    precision: null,
    nullable: true,
  })
  cityCode: number;

  @Column({
    type: 'integer',
    precision: null,
    nullable: true,
  })
  districtCode: number;

  @Column({
    type: 'integer',
    precision: null,
    nullable: true,
  })
  wardCode: number;

  @Column({
    name: 'address',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  address: string;

  @Unique('phone_unique', ['phone_number'])
  @IsNotEmpty({ message: 'Phone number is required' })
  @MinLength(1)
  @MaxLength(11)
  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: '11',
    nullable: false,
  })
  phoneNumber: string;

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

  @Column({
    name: 'isDelete',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isDelete?: boolean;

  @OneToMany(() => ImageMovieTheater, (item) => item.movieTheater)
  items: ImageMovieTheater[];

  @OneToMany(() => Room, (item) => item.movieTheater)
  rooms: Room[];
}

@Entity('ImageMovieTheater')
export class ImageMovieTheater {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movietheater, (movieTheater) => movieTheater.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  movieTheater: Movietheater;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: true,
    default: true,
  })
  status?: boolean;

  @Column({
    name: 'url',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  url: string;

  @Column({
    name: 'public_id',
    type: 'varchar',
    length: '255',
    nullable: true,
  })
  public_id: string;
}
