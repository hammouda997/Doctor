export interface IToken {
  accessToken?: string;
  refreshToken?: string;
}
export interface ISerializedToken {
  id: string;
  iat?: number;
  sessionId: string;
}
