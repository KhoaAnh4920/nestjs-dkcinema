import { UserGender } from '../users/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Nguyen', description: 'First name' })
  @IsString()
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  fullName!: string;

  @ApiProperty({ example: '0901234567', description: 'Phone number' })
  @IsDefined()
  @MinLength(10)
  @MaxLength(15)
  phoneNumber!: string;

  @ApiProperty()
  @IsDefined()
  readonly phoneOtp!: string;

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  @IsEmail()
  @IsDefined()
  @MaxLength(500)
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty({ example: 214, description: 'cityCode' })
  @IsInt()
  @IsDefined()
  cityCode: number;

  @ApiProperty({ example: 314, description: 'cityCode' })
  @IsInt()
  @IsDefined()
  districtCode: number;

  @ApiProperty({ example: 514, description: 'cityCode' })
  @IsInt()
  @IsDefined()
  wardCode: number;

  @ApiProperty({ example: 514, description: 'cityCode' })
  @IsDefined()
  address: string;

  @ApiProperty({ enum: UserGender })
  @IsOptional()
  @IsString()
  gender?: UserGender;

  @ApiProperty()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;
}
