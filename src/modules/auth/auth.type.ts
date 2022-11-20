import { ICurrentUser } from '../shared/auth/auth.type';

export type IPayloadJWT = ICurrentUser;

export interface IAuthResponse {
  readonly access_token: string;
  readonly userInfo: any;
}
