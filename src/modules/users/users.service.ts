import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { AppError, ERROR_CODE } from '../shared/error';
import { User } from './user.entity';
import {
  CreateUserModelReq,
  ICreateUserViewReq,
  ISendOtpViewReq,
  VerifyEmailView,
} from './user.type';
import { UserUtil } from '../shared/util';
import { ContentRequestOTP } from '../otp/otp.enum';
import { OtpService } from '../otp/otp.service';
import { OTP_EXPIRE_SECOND, OTP_LENGTH } from '../otp/otp.constant';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly otpService: OtpService,
  ) {}

  public async findUserWithRole(identity: string): Promise<User | undefined> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email OR user.phone_number = :phone_number', {
        email: identity,
        phone_number: identity,
      })
      .getOne();
  }

  public async createUser(createUserReq: ICreateUserViewReq): Promise<User> {
    // Check email and phoneNumber
    const email = createUserReq.email;
    const phoneNumber = createUserReq.phoneNumber;
    const isExisted = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.phoneNumber = :phoneNumber', { phoneNumber })
      .getOne();
    console.log('isExisted: ', isExisted);
    if (isExisted) {
      throw new AppError(ERROR_CODE.EMAIL_OR_PHONE_EXISTS);
    }

    const hashedPassword = await UserUtil.hashPassword(createUserReq.password);
    const role = await this.roleService.getRoleByCode(createUserReq.role);

    if (!role) {
      throw new AppError(ERROR_CODE.ROLE_NOT_FOUND);
    }

    const createUserModelReq = new CreateUserModelReq(
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

  public async sendOTP(payload: ISendOtpViewReq): Promise<string> {
    const { userIdentity, context, format, otpMethod } = payload;

    // const user = await this.usersRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.role', 'role')
    //   .where('user.email = :email OR user.phone_number = :phone_number', {
    //     email: userIdentity,
    //     phone_number: userIdentity,
    //   })
    //   .getOne();

    // console.log('user: ', user);
    // if (!user && context === ContentRequestOTP.CREATE_CUSTOMER) {
    //   throw new AppError(ERROR_CODE.USER_NOT_FOUND);
    // }
    const otpCode = await this.otpService.generateOtp(
      context,
      userIdentity,
      OTP_EXPIRE_SECOND,
      OTP_LENGTH,
      format,
    );
    // try {
    //   const result = await this.sendSMS(userIdentity, otpCode);
    //   result.subscribe(data => {
    //     const {
    //       data: { code, transactionid: transactionId, message },
    //     } = data;

    //     const history = new CreateHistoryModelReq(
    //       userIdentity,
    //       otpCode,
    //       otpMethod,
    //       context,
    //       transactionId,
    //       code,
    //       message,
    //     );
    //     this.historyService.createHistory(history);
    //   });
    // } catch (err) {
    //   console.log('ERR', err);
    // }

    return otpCode;
  }

  public async userVerifyEmail(payload: VerifyEmailView): Promise<boolean> {
    console.log('payload', payload);
    const { userId } = payload;
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
    console.log('Check user', user);
    user.status = 1;
    if (!user) throw new AppError(ERROR_CODE.USER_NOT_FOUND);
    await this.usersRepository.save(user);
    return true;
  }
}
