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
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class listPos {
  @ApiProperty()
  pos: number;

  @ApiProperty()
  typeId: number;
}

class listSeets {
  @ApiProperty()
  posOfRow: number;

  @ApiProperty({ isArray: true, type: listPos })
  posOfColumn: listPos[];
}

export class AdminCreateRoomDto {
  @ApiProperty({ example: 'Phòng 1' })
  @IsString()
  @IsDefined()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 16, description: 'numberOfColumn' })
  @IsInt()
  @IsDefined()
  numberOfColumn: number;

  @ApiProperty({ example: 16, description: 'numberOfRow' })
  @IsInt()
  @IsDefined()
  numberOfRow: number;

  @ApiProperty({ example: 1, description: 'movieTheater id' })
  @IsInt()
  @IsDefined()
  movieTheaterId: number;

  @ApiProperty({ isArray: true, type: listSeets })
  seets: listSeets[];
}

export class FindOneByMovileTheaterId {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  movieTheaterId!: number;
}
