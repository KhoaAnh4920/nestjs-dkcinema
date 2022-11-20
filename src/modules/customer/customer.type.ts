import { UserGender } from '../users/user.enum';
import { IRole } from '../role/role.type';
import { RoleCode } from '../role/role.enum';

export interface ICustomer {
  readonly id: number;
  readonly email: string;
  readonly phoneNumber: string;
  readonly fullName: string;
  readonly password: string;
  readonly status: string;
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
  readonly phoneOtp: string;
  readonly fullName: string;
  readonly password: string;
  readonly cityCode: number;
  readonly districtCode: number;
  readonly wardCode: number;
  readonly address: string;
  readonly gender?: UserGender;
  readonly avatar?: string;
  readonly dob?: Date;
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

export class CreateCustomerViewReq implements ICreateUserViewReq {
  constructor(
    readonly email: string,
    readonly phoneNumber: string,
    readonly phoneOtp: string,
    readonly fullName: string,
    readonly password: string,
    readonly cityCode: number,
    readonly districtCode: number,
    readonly wardCode: number,
    readonly address: string,
    readonly gender?: UserGender,
    readonly avatar?: string,
    readonly dob?: Date,
  ) {}
}

export class CreateCustomerModelReq implements ICreateUserModelReq {
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
