import { RoleCode } from './role.enum';

export interface IRole {
  readonly id: number;
  readonly name: RoleCode;
}

export class RoleResponse implements IRole {
  constructor(readonly id: number, readonly name: RoleCode) {}
}

export class BriefRoleResponse implements IRole {
  constructor(readonly id: number, readonly name: RoleCode) {}
}
