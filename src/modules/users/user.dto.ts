import { RoleCode } from '../role/role.enum';
import { UserGender } from './user.enum';
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
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentRequestOTP, TypeSender } from '../otp/otp.enum';
import { RandomTypes } from '../shared/common/stringUtils';

export class AdminCreateUserDto {
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

  @ApiProperty({ example: 'abc@gmail.com', description: 'Email' })
  @IsEmail()
  @IsDefined()
  @MaxLength(500)
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty({
    example: `${RoleCode.STAFF} | ${RoleCode.CUSTOMER}`,
    description: 'Role of user',
  })
  @IsDefined()
  role!: RoleCode;

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

export class RequestSendOTPDto {
  @ApiProperty({
    example:
      'RESET_PASSWORD | CREATE_CUSTOMER | CREATE_SUPPLIER | DELETE_ACCOUNT',
    description: 'Context of verify OTP',
  })
  @IsEnum(ContentRequestOTP)
  context!: ContentRequestOTP;

  @ApiProperty()
  @IsDefined()
  @IsString()
  identity!: string;

  @ApiProperty({
    type: String,
    enum: TypeSender,
    example: 'EMAIL | SMS',
    description: 'Type Send',
  })
  @IsEnum(TypeSender)
  method!: TypeSender;

  @ApiProperty({
    type: String,
    enum: RandomTypes,
    example: 'STRING_ONLY | NUMBER_ONLY | STRING_NUMBER',
    description: 'OTP format',
  })
  @IsEnum(RandomTypes)
  format!: RandomTypes;
}
