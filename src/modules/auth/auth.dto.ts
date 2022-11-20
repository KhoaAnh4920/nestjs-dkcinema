import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
// import { IsPasswordValid } from '../shared/auth';
import { ErrorList, ERROR_CODE } from '../shared/error';

export class LoginPayload {
  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly identity!: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  readonly password!: string;
}

// export class ChangePasswordDto {
//   @ApiProperty()
//   @IsDefined()
//   @IsString()
//   readonly currentPassword!: string;

//   @ApiProperty()
//   @IsDefined()
//   @IsPasswordValid({ message: ErrorList[ERROR_CODE.INVALID_PASSWORD].message })
//   @IsString()
//   readonly newPassword!: string;
// }

// export class ConfirmPasswordDto {
//   @ApiProperty()
//   @IsDefined()
//   @IsString()
//   readonly password!: string;
// }
