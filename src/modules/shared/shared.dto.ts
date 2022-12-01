import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
// import { Timestamp } from 'typeorm';

export class FindOneById {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id!: number;
}

export class FindOneByKey {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  key!: string;

  @ApiProperty({
    required: false,
  })
  // @IsNumber()
  @IsOptional()
  @Type(() => Number)
  type?: number = undefined;
}
