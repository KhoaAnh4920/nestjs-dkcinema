import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { ICreateUserViewReq, CreateCustomerModelReq } from './customer.type';
import { AppError, ERROR_CODE } from '../shared/error';
import { UserUtil } from '../shared/util';
import { ValidateOTPViewReq } from '../otp/otp.type';
import { ContentRequestOTP } from '../otp/otp.enum';
import { OtpService } from '../otp/otp.service';
import { RoleCode } from '../role/role.enum';
import { RoleService } from '../role/role.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly roleService: RoleService,
  ) {}

  public async createUser(createUserReq: ICreateUserViewReq): Promise<User> {
    // Check email and phoneNumber
    const email = createUserReq.email;
    const phoneNumber = createUserReq.phoneNumber;
    const isExisted = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.phoneNumber = :phoneNumber', { phoneNumber })
      .getOne();

    if (isExisted) {
      throw new AppError(ERROR_CODE.EMAIL_OR_PHONE_EXISTS);
    }
    // Check otp
    console.log(createUserReq.phoneOtp);
    const payload = new ValidateOTPViewReq(
      ContentRequestOTP.CREATE_CUSTOMER,
      createUserReq.phoneNumber,
      createUserReq.phoneOtp,
    );
    await this.otpService.validateOTP(payload);

    const hashedPassword = await UserUtil.hashPassword(createUserReq.password);
    const role = await this.roleService.getRoleByCode(RoleCode.CUSTOMER);

    const createUserModelReq = new CreateCustomerModelReq(
      email,
      phoneNumber,
      createUserReq.fullName,
      hashedPassword,
      role,
      createUserReq.cityCode,
      createUserReq.districtCode,
      createUserReq.wardCode,
      createUserReq.address,
      createUserReq.gender,
      createUserReq.avatar,
      createUserReq.dob,
    );

    let user = new User();
    user = this.usersRepository.merge(user, createUserModelReq);
    return this.usersRepository.save(user);
  }
}
