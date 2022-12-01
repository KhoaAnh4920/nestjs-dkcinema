import { ContentRequestOTP, TypeSender } from '../otp/otp.enum';
import { RoleCode } from '../role/role.enum';
import { IRole } from '../role/role.type';
import { RandomTypes } from '../shared/common/stringUtils';
import { UserGender, UserStatus } from './user.enum';

export interface IUser {
  readonly id: number;
  readonly email: string;
  readonly phoneNumber: string;
  readonly fullName: string;
  readonly password: string;
  readonly role: IRole;
  readonly status: UserStatus;
  readonly cityCode: number;
  readonly districtCode: number;
  readonly wardCode: number;
  readonly address: string;
  readonly gender?: UserGender;
  readonly avatar?: string;
  readonly dob?: Date;
}

export interface ICreateUserViewReq {
  readonly email: string;
  readonly phoneNumber: string;
  readonly fullName: string;
  readonly password: string;
  readonly role: RoleCode;
  readonly cityCode: number;
  readonly districtCode: number;
  readonly wardCode: number;
  readonly address: string;
  readonly gender?: UserGender;
  readonly avatar?: string;
  readonly dob?: Date;
}

export class AdminCreateUserViewReq implements ICreateUserViewReq {
  constructor(
    readonly email: string,
    readonly phoneNumber: string,
    readonly fullName: string,
    readonly password: string,
    readonly role: RoleCode,
    readonly cityCode: number,
    readonly districtCode: number,
    readonly wardCode: number,
    readonly address: string,
    readonly gender?: UserGender,
    readonly avatar?: string,
    readonly dob?: Date,
  ) {}
}

export class UserResponse {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly phoneNumber: string,
    readonly fullName: string,
    readonly role: IRole,
    readonly cityCode: number,
    readonly districtCode: number,
    readonly wardCode: number,
    readonly address: string,
    readonly gender?: UserGender,
    readonly avatar?: string,
    readonly dob?: Date,
  ) {}
}

export interface ICreateUserModelReq {
  readonly email: string;
  readonly phoneNumber: string;
  readonly fullName: string;
  readonly password: string;
  readonly role: IRole;
  readonly cityCode: number;
  readonly districtCode: number;
  readonly wardCode: number;
  readonly address: string;
  readonly gender?: UserGender;
  readonly avatar?: string;
  readonly dob?: Date;
}

export class CreateUserModelReq implements ICreateUserModelReq {
  constructor(
    readonly email: string,
    readonly phoneNumber: string,
    readonly fullName: string,
    readonly password: string,
    readonly role: IRole,
    readonly cityCode: number,
    readonly districtCode: number,
    readonly wardCode: number,
    readonly address: string,
    readonly gender?: UserGender,
    readonly avatar?: string,
    readonly dob?: Date,
  ) {}
}

export interface ISendOtpViewReq {
  context: ContentRequestOTP;
  userIdentity: string;
  otpMethod: TypeSender;
  format: RandomTypes;
}

export class UserLoginResponse extends UserResponse {
  constructor(
    id: number,
    email: string,
    fullName: string,
    role: IRole,
    readonly briefRole: IRole,
    cityCode: number,
    districtCode: number,
    wardCode: number,
    address: string,
    gender: UserGender,
    phoneNumber?: string,
    avatar?: string,
    dob?: Date,
  ) {
    super(
      id,
      email,
      fullName,
      phoneNumber,
      role,
      cityCode,
      districtCode,
      wardCode,
      address,
      gender,
      avatar,
      dob,
    );
  }
}

// readonly id: number,
//     readonly email: string,
//     readonly phoneNumber: string,
//     readonly fullName: string,
//     readonly role: IRole,
//     readonly cityCode: number,
//     readonly districtCode: number,
//     readonly wardCode: number,
//     readonly address: string,
//     readonly gender?: UserGender,
//     readonly avatar?: string,
//     readonly dob?: Date,

export interface VerifyEmailView {
  readonly userId: number;
}

export class VerifyEmailViewReq implements VerifyEmailView {
  constructor(readonly userId: number) {}
}
