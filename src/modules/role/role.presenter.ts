import { IRole, RoleResponse, BriefRoleResponse } from './role.type';

export class RolePresenter {
  public static formatRoleResponse(roleModelRes: IRole): RoleResponse {
    return new RoleResponse(roleModelRes.id, roleModelRes.name);
  }

  public static formatBriefRoleResponse(
    roleModelRes: IRole,
  ): BriefRoleResponse {
    return new BriefRoleResponse(roleModelRes.id, roleModelRes.name);
  }
}
