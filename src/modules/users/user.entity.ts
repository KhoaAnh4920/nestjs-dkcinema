import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { UserGender, UserStatus } from './user.enum';
import { Role } from '../role/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique('email_unique', ['email'])
  @IsNotEmpty({ message: 'Email is required' })
  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  email: string;

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

  @Exclude()
  @Column({
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  password: string;

  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(2)
  @MaxLength(255)
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: '255',
    nullable: false,
  })
  fullName: string;

  @Column({
    type: 'smallint',
    default: UserStatus.INACTIVE,
  })
  status: UserStatus;

  @Column({
    type: 'varchar',
    length: '10',
    nullable: false,
  })
  gender: UserGender;

  @Exclude()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    precision: null,
    nullable: true,
  })
  dob: Date;

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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar?: string;

  @Column({
    name: 'isDelete',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isDelete?: boolean;

  @ManyToOne(() => Role, (role) => role.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;
}
