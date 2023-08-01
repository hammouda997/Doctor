import {IUser} from "models/UserModel";

export interface IToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface ISerializedToken {
  id: string;
  iat?: number;
  sessionId: string;
}

export type ISignInResponse = {
  token: IToken;
  user: IUser;
};
export type IByTokenResponse = {
  isAnonymous: boolean;
  token?: IToken;
  user: IUser;
};

export type UserUnionType = IUser | null;
