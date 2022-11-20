import { CustomerService } from './customer.service';
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
  //   ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateCustomerDto } from './customer.dto';
import { CreateCustomerViewReq } from './customer.type';
import { Response } from 'express';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService, //private readonly otpService: OtpService,
  ) {}

  @ApiTags('Customer')
  @Post('/signUp')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  public async customerSignIn(
    @Body() body: CreateCustomerDto,
    @Res() res: Response,
  ) {
    const createCustomerReq = new CreateCustomerViewReq(
      body.email,
      body.phoneNumber,
      body.phoneOtp,
      body.fullName,
      body.password,
      body.cityCode,
      body.districtCode,
      body.wardCode,
      body.address,
      body.gender,
      body.avatar,
      body.dob,
    );
    const updatedUser = await this.customerService.createUser(
      createCustomerReq,
    );
    console.log('updatedUser: ', updatedUser);
    // const singleRes: ISingleRes<UserResponse> = {
    //   success: true,
    //   data: updatedUser,
    // };
    return res.status(HttpStatus.CREATED).send(updatedUser);
  }
}
