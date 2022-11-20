import {
  IUser,
  UserLoginResponse,
  // IUserViewRes,
  // UserLoginResponse,
  UserResponse,
  // UserViewRes,
} from './user.type';
import { RolePresenter } from '../role/role.presenter';

export class UserPresenter {
  public static formatUserResponse(user: IUser): UserResponse {
    return new UserResponse(
      user.id,
      user.email,
      user.phoneNumber,
      user.fullName,
      RolePresenter.formatRoleResponse(user.role),
      user.cityCode,
      user.districtCode,
      user.wardCode,
      user.address,
      user.gender,
      user.avatar,
      user.dob,
    );
  }

  // public static formatUserLoginResponse(user: IUser): UserLoginResponse {
  //   return new UserLoginResponse(
  //     user.id,
  //     user.email,
  //     user.fullName,
  //     RolePresenter.formatRoleResponse(user.role),
  //     RolePresenter.formatBriefRoleResponse(user.role),
  //     user.status,
  //     user.phoneNumber,
  //     user.avatar,
  //     user.loginAttempts,
  //     user.lockUntil,
  //     user.externalId,
  //     user.groupId,
  //     user.extraData,
  //     user.createdAt,
  //   );
  // }

  // public static formatUserLoginViewRes(user: UserLoginResponse) {
  //   return new UserResponse(
  //     user.id,
  //     user.email,
  //     user.fullName,
  //     user.briefRole,
  //     user.status,
  //     user.phoneNumber,
  //     user.avatar,
  //     user.loginAttempts,
  //     user.lockUntil,
  //     user.externalId,
  //     user.groupId,
  //     user.extraData,
  //     user.createdAt,
  //   );
  // }

  // public static formatUserViewRes(user: IUser): IUserViewRes {
  //   return new UserViewRes(
  //     user.id,
  //     user.email,
  //     user.phoneNumber,
  //     user.fullName,
  //     RolePresenter.formatBriefRoleResponse(user.role),
  //     user.status,
  //     user.gender,
  //     user.dob,
  //     user.externalId,
  //     user.avatar,
  //     user.extraData,
  //     user.createdAt,
  //   );
  // }

  public static formatUserLoginResponse(user: IUser): UserLoginResponse {
    return new UserLoginResponse(
      user.id,
      user.email,
      user.fullName,
      RolePresenter.formatRoleResponse(user.role),
      RolePresenter.formatBriefRoleResponse(user.role),
      user.cityCode,
      user.districtCode,
      user.wardCode,
      user.address,
      user.gender,
      user.phoneNumber,
      user.avatar,
      user.dob,
    );
  }

  public static formatUserLoginViewRes(user: UserLoginResponse) {
    return new UserResponse(
      user.id,
      user.email,
      user.fullName,
      user.phoneNumber,
      user.briefRole,
      user.cityCode,
      user.districtCode,
      user.wardCode,
      user.address,
      user.gender,
      user.avatar,
      user.dob,
    );
  }
}
