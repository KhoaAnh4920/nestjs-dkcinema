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

class listImages {
  @ApiProperty()
  image: string;

  @ApiProperty()
  public_id: string;
}

export class AdminCreateMovieTheaterDto {
  @ApiProperty({ example: 'Rap Cao Lỗ', description: "MovieTheater's name" })
  @IsString()
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  name: string;

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

  @ApiProperty({ example: '0901234567', description: 'Phone number' })
  @IsDefined()
  @MinLength(10)
  @MaxLength(15)
  phoneNumber!: string;

  @ApiProperty({ isArray: true, type: listImages })
  listImage: listImages[];
}
