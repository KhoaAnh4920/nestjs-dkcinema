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
  Max, 
  Min
} from 'class-validator';
import { Type } from 'class-transformer';

class listImages {
    @ApiProperty()
    image: string;
  
    @ApiProperty()
    public_id: string;
  }

export class AdminCreateMovieDto {
    @ApiProperty({ example: 'Doctor Strange' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    name: string;

    @ApiProperty({ example: 'Bác sĩ lạ' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    transName: string;

    @ApiProperty({ example: 'Viet Nam' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    country: string;

    @ApiProperty({ example: 'Tiếng Việt' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    language: string;

    @ApiProperty({ example: 180})
    @IsInt()
    @IsDefined()
    @MinLength(0)
    @Min(10)
    duration: number;

    @ApiProperty({ example: 'AAAA' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    description: string;

    @ApiProperty({ example: 'Galaxy' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    brand: string;

    @ApiProperty({ example: 'AA, BB' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    cast: string;

    @ApiProperty({ example: 1})
    @IsInt()
    @IsDefined()
    @Min(0)
    @Max(1)
    status: number;

    @ApiProperty({ example: 1})
    @IsInt()
    @IsDefined()
    @Min(1)
    typeId: number;

    @ApiProperty({ example: 1640599036184})
    @IsInt()
    @IsDefined()
    releaseTime: number;

    @ApiProperty({ example: 'https://www.youtube.com/watch?v=aWzlQ2N6qqg' })
    @IsString()
    @IsDefined()
    @MinLength(1)
    @MaxLength(255)
    url: string;

    @ApiProperty({ isArray: true, type: listImages })
    listImage: listImages[];
  
   
  }