import {
  Body,
  Controller,
  //   Get,
  HttpStatus,
  //   Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiOperation,
  //   ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AdminCreateUserDto, RequestSendOTPDto } from './user.dto';
import { ISingleRes } from '../shared/response';
import { AdminCreateUserViewReq, UserResponse } from './user.type';
import { UserPresenter } from './user.presenter';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //private readonly otpService: OtpService,
  ) {}

  @ApiTags('admin-users')
  @Post('/admin')
  @ApiOperation({ summary: 'Admin create user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  public async adminCreateUser(
    @Body() body: AdminCreateUserDto,
    @Res() res: Response,
  ) {
    const viewReq = new AdminCreateUserViewReq(
      body.email,
      body.phoneNumber,
      body.fullName,
      body.password,
      body.role,
      body.cityCode,
      body.districtCode,
      body.wardCode,
      body.address,
      body.gender,
      body.avatar,
      body.dob,
    );
    const updatedUser = await this.usersService.createUser(viewReq);
    console.log('updatedUser: ', updatedUser);
    // const singleRes: ISingleRes<UserResponse> = {
    //   success: true,
    //   data: updatedUser,
    // };
    return res.status(HttpStatus.CREATED).send(updatedUser);
  }

  @ApiTags('Customer')
  @Post('/request-send-otp')
  @ApiOperation({ summary: 'Send OTP' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Request send mail OTP',
  })
  public async adminRequestSendOtp(
    @Body() payload: RequestSendOTPDto,
    @Res() res: Response,
  ): Promise<any> {
    const otpCode = await this.usersService.sendOTP({
      context: payload.context,
      otpMethod: payload.method,
      userIdentity: payload.identity,
      format: payload.format,
    });
    console.log('otpCode: ', otpCode);

    const singleRes: ISingleRes<{ otpCode: string }> = {
      success: true,
      data: { otpCode },
    };
    return res.status(HttpStatus.OK).send(singleRes);
  }
}
