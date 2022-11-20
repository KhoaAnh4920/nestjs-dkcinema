import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RoleCode } from '../role/role.enum';
import { AppError, ERROR_CODE } from '../shared/error';
import { UserUtil } from '../shared/util';
import { UserPresenter } from '../users/user.presenter';
import { LoginPayload } from './auth.dto';
import { IPayloadJWT } from './auth.type';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService, // private roleService: RoleService,
  ) {}

  async validateUser(identity: string, pass: string): Promise<any> {
    const user = await this.userService.findUserWithRole(identity);

    // const user: any = {};
    if (!user || user.isDelete) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const compareResult = await UserUtil.validatePassword(pass, user.password);
    // const compareResult = await compare(pass, user.password);
    if (!compareResult) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }
    // const { password, ...result } = user;
    return UserPresenter.formatUserLoginResponse(user);
  }

  async login(user: LoginPayload) {
    const userData = await this.validateUser(user.identity, user.password);

    if (!userData) {
      throw new UnauthorizedException();
    }

    // const roleData = await this.roleService.getRoleById(userData.role);
    // const roleData: any = {};
    const payload: IPayloadJWT = {
      userId: userData.id,
      role: userData.role,
    };

    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
      userInfo: UserPresenter.formatUserLoginViewRes(userData),
    };
  }
}
